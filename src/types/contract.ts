import { JsonFragment, Fragment } from '@ethersproject/abi'

export interface Contract {
    ABI: ReadonlyArray<Fragment | JsonFragment | string>;
    bytecode: string;
}
