var fixtures = require('./fixtures');
var local = require('../');
var dedupe = require('../dedupe');
var localPackage = require('../package.json');

var npm = require('classnames');
var npmDedupe = require('classnames/dedupe');
var npmPackage = require('./node_modules/classnames/package.json');

function log (message) {
	console.log(message);
	var results = document.getElementById('results');
	//noinspection InnerHTMLJS
	results.innerHTML += (message + '\n').replace(/\n/g, '<br/>');
}

if (localPackage.version !== npmPackage.version) {
	log('Your local version (' + localPackage.version + ') does not match the installed version (' + npmPackage.version + ')\n\n' +
		'Please run `npm update` in ./benchmarks to ensure you are benchmarking\n' +
		'the latest version of this package.\n');
	return;
}

function iterate (array, iterator, i, callback) {
	if (i >= 0 && i < array.length) {
		iterator(array[i], i, array);
		setTimeout(iterate.bind(null, array, iterator, i + 1, callback), 1);
	} else if (callback) {
		callback();
	}
}

function deferredForEach (array, iterator, callback) {
	iterate(array, iterator, 0, callback);
}

var runSuite = require('./runSuite');

window.onload = function () {
	//noinspection PlatformDetectionJS
	log(navigator.userAgent);
	setTimeout(function () {
		deferredForEach(fixtures, function (f) {
			runSuite(local, npm, dedupe, npmDedupe, f, log);
		}, function () {
			log('Finished');
			document.getElementById('loader').style.display = 'none';
		});
	}, 100);
};
