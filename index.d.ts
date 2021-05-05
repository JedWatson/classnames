// LICENSE is MIT
//
// Copyright (c) 2018
//   Dave Keen <http://www.keendevelopment.ch>
//   Adi Dahiya <https://github.com/adidahiya>
//   Jason Killian <https://github.com/JKillian>
//   Sean Kelley <https://github.com/seansfkelley>
//   Michal Adamczyk <https://github.com/mradamczyk>
//   Marvin Hagemeister <https://github.com/marvinhagemeister>

export type Value = string | number | boolean | undefined | null;
export type Mapping = { [key: string]: any };
interface ArgumentArray extends Array<Value | Mapping>{}
export type Argument = Value | Mapping | ArgumentArray[];

export default function classNames(...args: Argument[]): string;
