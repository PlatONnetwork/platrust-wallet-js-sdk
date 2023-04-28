import { BigNumber } from "@ethersproject/bignumber";

/**
 * number like type
 * @typedef {number|string|} NumberLike
 */
export type NumberLike = number | string;


/**
 * is number like
 * @param {any} value
 * @returns {boolean}
 */
export function isNumberLike(value: any): boolean {
    return typeof value === "number" || typeof value === "string";
}

/**
 * NumberLike to Dec string
 * @param {NumberLike} value
 * @returns {string}
 */
export function toDecString(value: NumberLike): string {
    return BigNumber.from(value).toString();
}

/**
 * NumberLike to Hex string
 * @param {NumberLike} value
 * @returns {string}
 */
export function toHexString(value: NumberLike): string {
    if (typeof value === "number" || (typeof value === "string" && !value.startsWith('0x'))) {
        return BigNumber.from(value).toHexString();
    }
    return value;
}

/**
 * NumberLike to number
 * @param {NumberLike} value
 * @returns {number}
 */
export function toNumber(value: NumberLike): number {
    return BigNumber.from(value).toNumber();
}
