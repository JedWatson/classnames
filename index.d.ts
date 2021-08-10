// LICENSE is MIT
//
// Copyright (c) 2018
//   Dave Keen <http://www.keendevelopment.ch>
//   Adi Dahiya <https://github.com/adidahiya>
//   Jason Killian <https://github.com/JKillian>
//   Sean Kelley <https://github.com/seansfkelley>
//   Michal Adamczyk <https://github.com/mradamczyk>
//   Marvin Hagemeister <https://github.com/marvinhagemeister>
// TypeScript Version: 3.0

export type Value = string | number | boolean | undefined | null;
export type Mapping = Record<string, unknown>;
export interface ArgumentArray extends Array<Argument> {}
export type Argument = Value | Mapping | ArgumentArray;

/**
 * A simple JavaScript utility for conditionally joining classNames together.
 */
export default function classNames(...args: ArgumentArray): string;
