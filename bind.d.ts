import { type ClassValue } from './index.js';

export type Binding = Record<string, string>;

/**
 * A simple JavaScript utility for conditionally joining classNames together.
 */
export default function classNames(this: Binding | undefined, ...args: ClassValue[]): string;
