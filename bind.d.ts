import * as base from './index';

interface IClassNamesBind {
	bind: (styles: any) => typeof base;
}

declare var classNames: IClassNamesBind;

export = classNames;
