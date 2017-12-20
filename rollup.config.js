import * as fs from 'fs'
import * as path from 'path'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'	

const SOURCE_DIR = 'src'
const DIST_DIR = 'dist'

const entries = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isFile())
const flatten = arrays => arrays.reduce((flattened, arr) => flattened.concat(arr), [])

const configs = flatten(entries(SOURCE_DIR).map(entry => {
	const configBase = {
		input: path.join(SOURCE_DIR, entry),
  		plugins: [babel()],
	}

	const umdConfig = Object.assign({}, configBase, {
		output: {
			file: path.join(DIST_DIR, entry.replace(/\.js$/, '.umd.js')),
			format: 'umd',
			name: pkg.name,
		}
	})

	const bundlersConfig = Object.assign({}, configBase, {
		output: [{
			file: path.join(DIST_DIR, entry.replace(/\.js$/, '.es.js')),
			format: 'es',
		}, {
			file: path.join(DIST_DIR, entry.replace(/\.js$/, '.cjs.js')),
			format: 'cjs',
		}]
	})

	return [umdConfig, bundlersConfig]
}))

export default configs
