# Changelog

## v2.1.3 / 2015-07-02

* updated UMD wrapper to support AMD and CommonJS on the same pacge

## v2.1.2 / 2015-05-28

* added a proper UMD wrapper

## v2.1.1 / 2015-05-06

* minor performance improvement thanks to type caching
* improved benchmarking and results output

## v2.1.0 / 2015-05-05

* added alternate `dedupe` version of classNames, which is slower (10x) but ensures that if a class is added then overridden by a falsy value in a subsequent argument, it is excluded from the result.

## v2.0.0 / 2015-05-03

* performance improvement; switched to `Array.isArray` for type detection, which is much faster in modern browsers. A polyfill is now required for IE8 support, see the Readme for details.

## v1.2.2 / 2015-04-28

* license comment updates to simiplify certain build scenarios

## v1.2.1 / 2015-04-22

* added safe exporting for requireJS usage
* clarified Bower usage and instructions

## v1.2.0 / 2015-03-17

* added comprehensive support for array argiments, including nested arrays
* simplified code slightly

## Previous

Please see the git history for the details of previous versions.
