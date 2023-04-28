import { BigNumber, ethers } from "ethers";
import { AddressZero } from "../config/constants";

/**
 *
 *
 * @export
 * @enum {number}
 */
export enum SignatureMode {
    owner = 0x0,
    guardians = 0x1,
    session = 0x2
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
export function packSignatureHash(
    hash: string,
    signatureMode: SignatureMode = SignatureMode.owner,
    validAfter: number = 0,
    validUntil: number = 0,
    aggregator: string = AddressZero
) {
    //bytes32 _hash = keccak256(abi.encodePacked(hash,signatureMode,validationData));
    const validationData = BigNumber.from(validUntil).shl(160)
        .add(BigNumber.from(validAfter).shl(160 + 48))
        .add(BigNumber.from(aggregator));
    const _hash = ethers.utils.solidityKeccak256(
        ['bytes32', 'uint8', 'uint256'],
        [hash, signatureMode, validationData]
    );
    return _hash;
}

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
export function encodeSignature(
    signatureMode: SignatureMode,
    signature: string,
    validAfter: number = 0,
    validUntil: number = 0,
    aggregator: string = AddressZero,
) {
    const version = 0x0;

    const validationData = BigNumber.from(validUntil).shl(160)
        .add(BigNumber.from(validAfter).shl(160 + 48))
        .add(BigNumber.from(aggregator));

    let modeBit = 0b1;

    if (validationData.eq(0)) {
        modeBit = 0b0;
    }

    let packedSignature = BigNumber.from(version).and(0xff).toHexString();

    // 1byte data type
    {
        const datatype = BigNumber.from(signatureMode).shl(1).add(modeBit).and(0xff).toHexString().slice(2);
        packedSignature = packedSignature + datatype;
    }
    // data
    {
        let data = '';
        if (modeBit === 0b0) {
            // 0b0: dynamic data without validationData
        } else {
            // 0b1: dynamic data with validationData
            const _validationData = ethers.utils.hexZeroPad(ethers.utils.hexlify(validationData.toBigInt()), 32).slice(2);
            data = data + _validationData;

        }

        if (signature.startsWith('0x')) {
            signature = signature.slice(2);
        }
        signature = ethers.utils.hexZeroPad(
            ethers.utils.hexlify(signature.length / 2),
            32
        ).slice(2) + signature;

        data = data + signature;

        packedSignature = packedSignature + data;

    }
    return packedSignature;
}

/**
 *
 *
 * @param { string } packedSignature
 * @return {*}
 */
export function decodeSignature(packedSignature: string) {
    if (!packedSignature.startsWith('0x')) {
        packedSignature = '0x' + packedSignature;
    }
    const version = BigNumber.from(packedSignature.slice(0, 4));
    if (!version.eq(0)) {
        throw new Error('invalid version');
    }
    const datatype = BigNumber.from(packedSignature.slice(4, 6));
    const modeBit = datatype.and(0b1).toNumber();
    const signatureMode = datatype.shr(1).and(0b1111111);

    const data = packedSignature.slice(6);
    let signatureOffset = 6;
    let validAfter: BigNumber = BigNumber.from(0);
    let validUntil: BigNumber = BigNumber.from(0);
    let aggregator: string = '0x0000000000000000000000000000000000000000';
    let validationData: BigNumber = BigNumber.from(0);
    if (modeBit === 0b0) {
        // 0b0: dynamic data without validAfter and validUntil
    } else {
        // 0b1: dynamic data with validAfter and validUntil
        signatureOffset = signatureOffset + 64;
        validationData = BigNumber.from('0x' + data.slice(6, 6 + 64));
        validAfter = validationData.shr(160 + 48).and(0xffffffffffff);
        validUntil = validationData.shr(160).and(0xffffffffffff);
        const _mask = BigNumber.from('0xffffffffffffffffffffffffffffffffffffffff');
        aggregator = validationData.and(_mask).toHexString();
    }
    const _signature = data.slice(signatureOffset);
    const signatureLength = BigNumber.from('0x' + _signature.slice(0, 64)).toNumber();
    const signature = '0x' + _signature.slice(64, 64 + signatureLength * 2);
    return {
        signatureMode,
        signature,
        validationData,
        aggregator,
        validAfter,
        validUntil
    };
}
