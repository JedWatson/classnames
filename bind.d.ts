import * as base from './index';

export interface IClassNamesBind
{
	bind: (styles: any) => typeof base
}

export const classNames: IClassNamesBind;

export default classNames;
