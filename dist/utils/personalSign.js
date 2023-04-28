"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverAddress = exports.signMessage = void 0;
const ethers_1 = require("ethers");
const ethUtil = __importStar(require("ethereumjs-util"));
function signMessage(msg, privateKey) {
    const messageHex = Buffer.from(ethers_1.ethers.utils.arrayify(msg)).toString('hex');
    const personalMessage = ethUtil.hashPersonalMessage(ethUtil.toBuffer(ethUtil.addHexPrefix(messageHex)));
    const _privateKey = Buffer.from(privateKey.substring(2), "hex");
    const signature1 = ethUtil.ecsign(personalMessage, _privateKey);
    return ethUtil.toRpcSig(signature1.v, signature1.r, signature1.s);
}
exports.signMessage = signMessage;
function recoverAddress(msg, signature) {
    const messageHex = Buffer.from(ethers_1.ethers.utils.arrayify(msg)).toString('hex');
    const personalMessage = ethUtil.hashPersonalMessage(ethUtil.toBuffer(ethUtil.addHexPrefix(messageHex)));
    const signature1 = ethUtil.fromRpcSig(signature);
    const publicKey = ethUtil.ecrecover(personalMessage, signature1.v, signature1.r, signature1.s);
    const address = ethUtil.publicToAddress(publicKey).toString('hex');
    return ethUtil.addHexPrefix(address);
}
exports.recoverAddress = recoverAddress;
//# sourceMappingURL=personalSign.js.map