import { UserOperation } from "./userOperation";
import { Callbase } from "./callbase";
import { executeFromModule, executeBatchFromModule, ERC1155 as erc1155, ERC20 as erc20, ERC721 as erc721 } from "../types/abi";
import { BigNumber, ethers } from "ethers";
import { NumberLike } from "../utils/numberLike";
import { ApproveToken } from "../types/approveToken";
import { Operation } from "../types/operation"
import { BaseWalletContract } from "../contracts/baseWallet";


/**
 * erc20 token class
 * @class ERC20
 *
 */
export class ERC20 {

    private _callbase;

    /**
     * @constructor
     *
     */
    constructor() {
        this._callbase = new Callbase();
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
    approve(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
            maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
            verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _spender: string, _value: string) {

        let encodeABI = new ethers.utils.Interface(erc20).encodeFunctionData("approve", [_spender, _value]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas,callGasLimit, verificationGasLimit, preVerificationGas, data);
    }

    private readonly MAX_INT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //uint256 MAX_INT = 2**256 - 1


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
    transferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                 maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                 verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _value: string) {

        let encodeABI = new ethers.utils.Interface(erc20).encodeFunctionData("transferFrom", [_from, _to, _value]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
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
    transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
             maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
             verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _to: string, _value: string) {

        let encodeABI = new ethers.utils.Interface(erc20).encodeFunctionData("transfer", [_to, _value]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
}

/**
 * ERC721
 * @class
 */
export class ERC721 {
    private _callbase;

    /**
     * @constructor
     */
    constructor() {
        this._callbase = new Callbase();
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
    approve(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
            maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
            verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _spender: string, _tokenId: string) {

        let encodeABI = new ethers.utils.Interface(erc721).encodeFunctionData("approve", [_spender, _tokenId]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
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
    transferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                 maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                 verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _tokenId: string) {

        let encodeABI = new ethers.utils.Interface(erc721).encodeFunctionData("transferFrom", [_from, _to, _tokenId]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
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
    transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
             maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
             verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _to: string, _tokenId: string) {

        let encodeABI = new ethers.utils.Interface(erc721).encodeFunctionData("transfer", [_to, _tokenId]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
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
    safeTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                     maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                     verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _tokenId: string) {

        let encodeABI = new ethers.utils.Interface(erc721).encodeFunctionData("safeTransferFrom", [_from, _to, _tokenId]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
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
    setApprovalForAll(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                      maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                      verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _operator: string, _approved: boolean) {

        let encodeABI = new ethers.utils.Interface(erc721).encodeFunctionData("setApprovalForAll", [_operator, _approved]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }


}


/**
 * ERC1155
 * @class
 */
export class ERC1155 {
    private _callbase;

    /**
     * @constructor
     */
    constructor() {
        this._callbase = new Callbase();
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
    safeTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                     maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                     verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _id: string, _value: string, _data: string) {

        let encodeABI = new ethers.utils.Interface(erc1155).encodeFunctionData("safeTransferFrom", [_from, _to, _id, _value, _data]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
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
    safeBatchTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                          maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                          verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _ids: string, _values: string, _data: string) {

        let encodeABI = new ethers.utils.Interface(erc1155).encodeFunctionData("safeBatchTransferFrom", [_from, _to, _ids, _values, _data]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
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
    setApprovalForAll(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
                      maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
                      verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _operator: string, _approved: boolean) {

        let encodeABI = new ethers.utils.Interface(erc1155).encodeFunctionData("setApprovalForAll", [_operator, _approved]);
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [_token, 0, encodeABI, Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }


}

/**
 * ETH
 * @class
 */
export class LAT {
    private _callbase;

    /**
     * @constructor
     */
    constructor() {
        this._callbase = new Callbase();
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
    transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string,
             maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike,
             verificationGasLimit: NumberLike, preVerificationGas: NumberLike, to: string, value: string) {

        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
        const data = iface.encodeFunctionData("execute", [to, value, '0x', Operation.CALL]);
        return this._callbase.createOp(walletAddress, nonce, paymasterAddress, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas, data);
    }
}
