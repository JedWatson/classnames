type ClassValue = string | number | ClassDictionary | ClassArray;

interface ClassDictionary {
	[id: string]: boolean;
}

interface ClassArray extends Array<ClassValue> { }

export default function(...classes: ClassValue[]): string;
