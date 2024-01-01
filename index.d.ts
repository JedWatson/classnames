export type ClassValue = string | Record<string, unknown>;

/**
 * A simple JavaScript utility for conditionally joining classNames together.
 */
export default function classNames(...args: ClassValue[]): string;
