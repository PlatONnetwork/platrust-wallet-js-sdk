"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSignature = exports.encodeSignature = exports.packSignatureHash = exports.SignatureMode = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../config/constants");
/**
 *
 *
 * @export
 * @enum {number}
 */
var SignatureMode;
(function (SignatureMode) {
    SignatureMode[SignatureMode["owner"] = 0] = "owner";
    SignatureMode[SignatureMode["guardians"] = 1] = "guardians";
    SignatureMode[SignatureMode["session"] = 2] = "session";
})(SignatureMode = exports.SignatureMode || (exports.SignatureMode = {}));
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
function packSignatureHash(hash, signatureMode = SignatureMode.owner, validAfter = 0, validUntil = 0, aggregator = constants_1.AddressZero) {
    //bytes32 _hash = keccak256(abi.encodePacked(hash,signatureMode,validationData));
    const validationData = ethers_1.BigNumber.from(validUntil).shl(160)
        .add(ethers_1.BigNumber.from(validAfter).shl(160 + 48))
        .add(ethers_1.BigNumber.from(aggregator));
    const _hash = ethers_1.ethers.utils.solidityKeccak256(['bytes32', 'uint8', 'uint256'], [hash, signatureMode, validationData]);
    return _hash;
}
exports.packSignatureHash = packSignatureHash;
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
function encodeSignature(signatureMode, signature, validAfter = 0, validUntil = 0, aggregator = constants_1.AddressZero) {
    const version = 0x0;
    const validationData = ethers_1.BigNumber.from(validUntil).shl(160)
        .add(ethers_1.BigNumber.from(validAfter).shl(160 + 48))
        .add(ethers_1.BigNumber.from(aggregator));
    let modeBit = 0b1;
    if (validationData.eq(0)) {
        modeBit = 0b0;
    }
    let packedSignature = ethers_1.BigNumber.from(version).and(0xff).toHexString();
    // 1byte data type
    {
        const datatype = ethers_1.BigNumber.from(signatureMode).shl(1).add(modeBit).and(0xff).toHexString().slice(2);
        packedSignature = packedSignature + datatype;
    }
    // data
    {
        let data = '';
        if (modeBit === 0b0) {
            // 0b0: dynamic data without validationData
        }
        else {
            // 0b1: dynamic data with validationData
            const _validationData = ethers_1.ethers.utils.hexZeroPad(ethers_1.ethers.utils.hexlify(validationData.toBigInt()), 32).slice(2);
            data = data + _validationData;
        }
        if (signature.startsWith('0x')) {
            signature = signature.slice(2);
        }
        signature = ethers_1.ethers.utils.hexZeroPad(ethers_1.ethers.utils.hexlify(signature.length / 2), 32).slice(2) + signature;
        data = data + signature;
        packedSignature = packedSignature + data;
    }
    return packedSignature;
}
exports.encodeSignature = encodeSignature;
/**
 *
 *
 * @param { string } packedSignature
 * @return {*}
 */
function decodeSignature(packedSignature) {
    if (!packedSignature.startsWith('0x')) {
        packedSignature = '0x' + packedSignature;
    }
    const version = ethers_1.BigNumber.from(packedSignature.slice(0, 4));
    if (!version.eq(0)) {
        throw new Error('invalid version');
    }
    const datatype = ethers_1.BigNumber.from(packedSignature.slice(4, 6));
    const modeBit = datatype.and(0b1).toNumber();
    const signatureMode = datatype.shr(1).and(0b1111111);
    const data = packedSignature.slice(6);
    let signatureOffset = 6;
    let validAfter = ethers_1.BigNumber.from(0);
    let validUntil = ethers_1.BigNumber.from(0);
    let aggregator = '0x0000000000000000000000000000000000000000';
    let validationData = ethers_1.BigNumber.from(0);
    if (modeBit === 0b0) {
        // 0b0: dynamic data without validAfter and validUntil
    }
    else {
        // 0b1: dynamic data with validAfter and validUntil
        signatureOffset = signatureOffset + 64;
        validationData = ethers_1.BigNumber.from('0x' + data.slice(6, 6 + 64));
        validAfter = validationData.shr(160 + 48).and(0xffffffffffff);
        validUntil = validationData.shr(160).and(0xffffffffffff);
        const _mask = ethers_1.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffff');
        aggregator = validationData.and(_mask).toHexString();
    }
    const _signature = data.slice(signatureOffset);
    const signatureLength = ethers_1.BigNumber.from('0x' + _signature.slice(0, 64)).toNumber();
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
exports.decodeSignature = decodeSignature;
//# sourceMappingURL=signatures.js.map