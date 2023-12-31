import { ethers } from "ethers";
import * as ethUtil from 'ethereumjs-util';

export function signMessage(msg: string, privateKey: string) {
    const messageHex = Buffer.from(ethers.utils.arrayify(msg)).toString('hex');
    // const personalMessage = ethUtil.hashPersonalMessage(ethUtil.toBuffer(ethUtil.addHexPrefix(messageHex)));
    const _privateKey = Buffer.from(privateKey.substring(2), "hex");
    const signature1 = ethUtil.ecsign(ethUtil.toBuffer(ethUtil.addHexPrefix(messageHex)), _privateKey);
    console.log('v, r, s: ', signature1.v, signature1.r, signature1.s);
    return ethUtil.toRpcSig(signature1.v, signature1.r, signature1.s);
}

export function recoverAddress(msg: string, signature: string) {
    const messageHex = Buffer.from(ethers.utils.arrayify(msg)).toString('hex');
    // const personalMessage = ethUtil.hashPersonalMessage(ethUtil.toBuffer(ethUtil.addHexPrefix(messageHex)));
    const signature1 = ethUtil.fromRpcSig(signature);
    const publicKey = ethUtil.ecrecover(ethUtil.toBuffer(ethUtil.addHexPrefix(messageHex)), signature1.v, signature1.r, signature1.s);
    const address = ethUtil.publicToAddress(publicKey).toString('hex');
    return ethUtil.addHexPrefix(address);
}
