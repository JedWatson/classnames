import { ArgumentArray } from './index.js';
export type Binding = Record<string, string>;
export default function classNames(this: Binding | undefined, ...args: ArgumentArray): string;
