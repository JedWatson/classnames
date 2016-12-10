/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import * as assert from 'assert';
import classNames from '../';

describe('classNames module', function () {
	it('exports a function as default', function () {
		assert.equal(typeof classNames, 'function');
	});
});
