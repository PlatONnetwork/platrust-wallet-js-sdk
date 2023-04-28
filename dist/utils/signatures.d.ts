import { BigNumber } from "ethers";
/**
 *
 *
 * @export
 * @enum {number}
 */
export declare enum SignatureMode {
    owner = 0,
    guardians = 1,
    session = 2
}
/**
 *
 *
 * @param { string } hash
 * @param { SignatureMode } signatureMode
 * @param { number } [validAfter=0]
 * @param { number } [validUntil=0]
 * @param { string } [aggregator=AddressZero]
 * @return {*}
 */
export declare function packSignatureHash(hash: string, signatureMode?: SignatureMode, validAfter?: number, validUntil?: number, aggregator?: string): string;
/**
 *
 *
 * @static
 * @param { SignatureMode } signatureMode
 * @param { string } signer
 * @param { string } signature
 * @param { number } [validAfter=0]
 * @param { number } [validUntil=0]
 * @param { string } [aggregator=AddressZero]
 * @return {*}
 */
export declare function encodeSignature(signatureMode: SignatureMode, signature: string, validAfter?: number, validUntil?: number, aggregator?: string): string;
/**
 *
 *
 * @param { string } packedSignature
 * @return {*}
 */
export declare function decodeSignature(packedSignature: string): {
    signatureMode: BigNumber;
    signature: string;
    validationData: BigNumber;
    aggregator: string;
    validAfter: BigNumber;
    validUntil: BigNumber;
};
