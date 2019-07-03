export declare type ClassValue = string | null | boolean | undefined | ClassDictionary | ClassArray;

export interface ClassDictionary
{
	[id: string]: boolean | undefined | null;
}

export interface ClassArray extends Array<ClassValue> {}

export function classNames(...args: ClassArray): string;

export default classNames;
