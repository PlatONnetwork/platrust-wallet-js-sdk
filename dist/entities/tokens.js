"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAT = exports.ERC1155 = exports.ERC721 = exports.ERC20 = void 0;
const callbase_1 = require("./callbase");
const abi_1 = require("../types/abi");
const ethers_1 = require("ethers");
const operation_1 = require("../types/operation");
const baseWallet_1 = require("../contracts/baseWallet");
/**
 * erc20 token class
 * @class ERC20
 *
 */
class ERC20 {
    /**
     * @constructor
     *
     */
    constructor() {
        this.MAX_INT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //uint256 MAX_INT = 2**256 - 1
        this._callbase = new callbase_1.Callbase();
    }
    /**
     * approve token to spender
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _spender the spender address
     * @param {string} _value the value
     * @returns {UserOperation} the userOperation
     */
    approve(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _spender, _value) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC20).encodeFunctionData("approve", [_spender, _value]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
    /**
     * transfer token
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _to the to address
     * @param {string} _value the value
     * @returns {UserOperation} the userOperation
     *
     */
    transferFrom(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _from, _to, _value) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC20).encodeFunctionData("transferFrom", [_from, _to, _value]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
    /**
     * transfer token
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _to the to address
     * @param {string} _value the value
     * @returns {UserOperation} the userOperation
     */
    transfer(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _to, _value) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC20).encodeFunctionData("transfer", [_to, _value]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
}
exports.ERC20 = ERC20;
/**
 * ERC721
 * @class
 */
class ERC721 {
    /**
     * @constructor
     */
    constructor() {
        this._callbase = new callbase_1.Callbase();
    }
    /**
     * approve token to spender
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _spender the spender address
     * @param {string} _tokenId the token id
     * @returns {UserOperation} the userOperation
     *
     */
    approve(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _spender, _tokenId) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC721).encodeFunctionData("approve", [_spender, _tokenId]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
    /**
     * transfer token
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _to the to address
     * @param {string} _tokenId the token id
     * @returns {UserOperation} the userOperation
     */
    transferFrom(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _from, _to, _tokenId) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC721).encodeFunctionData("transferFrom", [_from, _to, _tokenId]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
    /**
     * transfer token
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _to the to address
     * @param {string} _tokenId the token id
     * @returns {UserOperation} the userOperation
     *
     */
    transfer(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _to, _tokenId) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC721).encodeFunctionData("transfer", [_to, _tokenId]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
    /**
     * safe transfer token
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _to the to address
     * @param {string} _tokenId the token id
     * @returns {UserOperation} the userOperation
     *
     */
    safeTransferFrom(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _from, _to, _tokenId) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC721).encodeFunctionData("safeTransferFrom", [_from, _to, _tokenId]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
    /**
     * Enable or disable approval for a third party ("operator") to manage all of `msg.sender`'s assets
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _operator the operator address
     * @param {boolean} _approved the approved
     * @returns {UserOperation} the userOperation
     *
     */
    setApprovalForAll(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _operator, _approved) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC721).encodeFunctionData("setApprovalForAll", [_operator, _approved]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
}
exports.ERC721 = ERC721;
/**
 * ERC1155
 * @class
 */
class ERC1155 {
    /**
     * @constructor
     */
    constructor() {
        this._callbase = new callbase_1.Callbase();
    }
    /**
     * safeTransferFrom
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _from the from address
     * @param {string} _to the to address
     * @param {string} _id the id
     * @param {string} _value the value
     * @param {string} _data the data
     * @returns {UserOperation} the userOperation
     */
    safeTransferFrom(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _from, _to, _id, _value, _data) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC1155).encodeFunctionData("safeTransferFrom", [_from, _to, _id, _value, _data]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
    /**
     * safeBatchTransferFrom
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _from the from address
     * @param {string} _to the to address
     * @param {string} _ids the ids
     * @param {string} _values the values
     * @param {string} _data the data
     * @returns {UserOperation} the userOperation
     *
     */
    safeBatchTransferFrom(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _from, _to, _ids, _values, _data) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC1155).encodeFunctionData("safeBatchTransferFrom", [_from, _to, _ids, _values, _data]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
    /**
     * Enable or disable approval for a third party ("operator") to manage all of `msg.sender`'s assets
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} _token the token address
     * @param {string} _operator the operator address
     * @param {boolean} _approved the approved
     * @returns {UserOperation} the userOperation
     *
     */
    setApprovalForAll(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, _token, _operator, _approved) {
        let encodeABI = new ethers_1.ethers.utils.Interface(abi_1.ERC1155).encodeFunctionData("setApprovalForAll", [_operator, _approved]);
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
}
exports.ERC1155 = ERC1155;
/**
 * ETH
 * @class
 */
class LAT {
    /**
     * @constructor
     */
    constructor() {
        this._callbase = new callbase_1.Callbase();
    }
    /**
     * transfer
     * @param {ethers.providers.BaseProvider} etherProvider the ethers.js provider e.g. ethers.provider
     * @param {string} walletAddress same as userOperation.sender
     * @param {NumberLike} nonce the nonce
     * @param {string} paymasterAddress the paymaster address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @param {string} to the to address
     * @param {string} value the value
     * @returns { UserOperation } the userOperation
     *
     */
    transfer(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, to, value) {
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [to, value, '0x', operation_1.Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
}
exports.LAT = LAT;
//# sourceMappingURL=tokens.js.map