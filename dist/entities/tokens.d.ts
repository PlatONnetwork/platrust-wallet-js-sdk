import { UserOperation } from "./userOperation";
import { NumberLike } from "../utils/numberLike";
/**
 * erc20 token class
 * @class ERC20
 *
 */
export declare class ERC20 {
    private _callbase;
    /**
     * @constructor
     *
     */
    constructor();
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
    approve(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _spender: string, _value: string): UserOperation;
    private readonly MAX_INT256;
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
    transferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _value: string): UserOperation;
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
    transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _to: string, _value: string): UserOperation;
}
/**
 * ERC721
 * @class
 */
export declare class ERC721 {
    private _callbase;
    /**
     * @constructor
     */
    constructor();
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
    approve(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _spender: string, _tokenId: string): UserOperation;
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
    transferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _tokenId: string): UserOperation;
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
    transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _to: string, _tokenId: string): UserOperation;
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
    safeTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _tokenId: string): UserOperation;
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
    setApprovalForAll(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _operator: string, _approved: boolean): UserOperation;
}
/**
 * ERC1155
 * @class
 */
export declare class ERC1155 {
    private _callbase;
    /**
     * @constructor
     */
    constructor();
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
    safeTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _id: string, _value: string, _data: string): UserOperation;
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
    safeBatchTransferFrom(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _from: string, _to: string, _ids: string, _values: string, _data: string): UserOperation;
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
    setApprovalForAll(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, _token: string, _operator: string, _approved: boolean): UserOperation;
}
/**
 * ETH
 * @class
 */
export declare class LAT {
    private _callbase;
    /**
     * @constructor
     */
    constructor();
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
    transfer(walletAddress: string, nonce: NumberLike, paymasterAddress: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike, to: string, value: string): UserOperation;
}
