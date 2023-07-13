"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bundler = exports.ApiTimeOut = void 0;
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const events_1 = require("events");
const constants_1 = require("../config/constants");
const entryPoint_1 = require("../contracts/entryPoint");
const httpRequest_1 = require("../utils/httpRequest");
class ApiTimeOut {
    constructor() {
        this.web3ApiRequestTimeout = 1000 * 60 * 10;
        this.web3ApiResponseTimeout = 1000 * 60 * 10;
        this.bundlerApiRequestTimeout = 1000 * 60 * 10;
        this.bundlerApiResponseTimeout = 1000 * 60 * 10;
    }
}
exports.ApiTimeOut = ApiTimeOut;
/**
 * bundler utils
 * @class Bundler
 */
class Bundler {
    /**
     * Bundler utils
     * @constructor Bundler
     * @param {String} entryPoint the entry point address
     * @param {ethers.providers.BaseProvider} etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} bundlerApiURL the bundler api url or the EOA private key
     * @param {ApiTimeOut?} timeout the timeout
     * @returns {Bundler}
     * @memberof Bundler
     */
    constructor(entryPoint, etherProvider, bundlerApiURL, timeout) {
        this._entryPoint = '';
        this._timeout = new ApiTimeOut();
        this._chainId = -1;
        this._init = false;
        this._entryPoint = entryPoint;
        this._etherProvider = etherProvider;
        this._bundlerApiURL = bundlerApiURL;
        if (timeout) {
            this._timeout = timeout;
        }
    }
    async rpcRequest(data, timeout) {
        if (!this._bundlerApiURL) {
            throw new Error('bundlerApi is not set');
        }
        if (typeof timeout === 'undefined') {
            timeout = this._timeout.web3ApiRequestTimeout;
        }
        let response = await httpRequest_1.HttpRequest.post(this._bundlerApiURL, data, timeout);
        if (response) {
            const rpcResp = response;
            if (!rpcResp.error) {
                return rpcResp.result;
            }
            else {
                throw rpcResp.error;
            }
        }
        throw new Error('request error');
    }
    /**
     * init the bundler
     * @returns {Promise<void>}
     */
    async init() {
        if (this._init) {
            return;
        }
        try {
            // test web3Api
            {
                // get chainId
                const _network = await this._etherProvider.getNetwork();
                if (!_network.chainId) {
                    throw new Error('web3Api error');
                }
                this._chainId = _network.chainId;
            }
            // test bundlerApi
            if (this._bundlerApiURL) {
                const chainId = ethers_1.BigNumber.from(await this.platon_chainId()).toNumber();
                if (chainId !== this._chainId) {
                    throw new Error('bundlerApi error');
                }
                const _eps = await this.platon_supportedEntryPoints();
                if (!_eps.includes(this._entryPoint)) {
                    throw new Error('bundlerApi error');
                }
            }
            this._entryPointContract = new ethers_1.ethers.Contract(this._entryPoint, entryPoint_1.EntryPointContract.ABI);
            this._init = true;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * get bundler supported chainid
     * @returns {Promise<String>} supported chainid
     * @memberof Bundler
     */
    async platon_chainId(timeout) {
        if (this._bundlerApiURL) {
            return this.rpcRequest({
                jsonrpc: '2.0',
                id: 1,
                method: 'platon_chainId',
                params: []
            }, timeout);
        }
        throw new Error('bundlerApi is not set');
    }
    /**
     * get bundler supported entry points
     * @returns {Promise<String[]>} supported entry points
     * @memberof Bundler
     */
    async platon_supportedEntryPoints(timeout) {
        if (this._bundlerApiURL) {
            return this.rpcRequest({
                jsonrpc: '2.0',
                id: 1,
                method: 'platon_supportedEntryPoints',
                params: []
            }, timeout);
        }
        throw new Error('bundlerApi is not set');
    }
    /**
     * send user operation via bundler
     * @param {UserOperation} userOp
     * @returns {Promise<String>} user operation hash
     * @memberof Bundler
     */
    async platon_sendUserOperation(userOp, timeout) {
        if (this._bundlerApiURL) {
            return this.rpcRequest({
                jsonrpc: '2.0',
                id: 1,
                method: 'platon_sendUserOperation',
                params: [
                    userOp.getStruct(),
                    this._entryPoint
                ]
            }, timeout);
        }
        throw new Error('bundlerApi is not set');
    }
    /**
     *
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout]
     * @return {Promise<EstimateUserOpGas>}  EstimateUserOpGas
     * @memberof Bundler
     */
    async platon_estimateUserOperationGas(userOp, timeout) {
        const _userOp = JSON.parse(userOp.toTuple());
        const estimateUserOpGasResult = {
            preVerificationGas: '0x0',
            verificationGas: '0x0',
            callGasLimit: '0x0'
        };
        if (this._bundlerApiURL) {
            const _estimateUserOpGasResult = await this.rpcRequest({
                jsonrpc: '2.0',
                id: 1,
                method: 'platon_estimateUserOperationGas',
                params: [
                    _userOp,
                    this._entryPoint
                ]
            }, timeout);
            estimateUserOpGasResult.preVerificationGas = _estimateUserOpGasResult.preVerificationGas;
            estimateUserOpGasResult.verificationGas = _estimateUserOpGasResult.verificationGas;
            estimateUserOpGasResult.callGasLimit = _estimateUserOpGasResult.callGasLimit;
        }
        return estimateUserOpGasResult;
    }
    async _getUserOperationEvent(userOpHash) {
        if (!this._entryPointContract) {
            throw new Error('entryPointContract is not set');
        }
        // TODO: eth_getLogs is throttled. must be acceptable for finding a UserOperation by hash
        const event = await this._entryPointContract?.queryFilter(this._entryPointContract.filters.UserOperationEvent(userOpHash));
        return event[0];
    }
    /**
     *
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout]
     * @return {Promise<String>} User operation receipt
     * @memberof Bundler
     */
    async platon_getUserOperationReceipt(userOpHash, timeout) {
        if (this._bundlerApiURL) {
            return this.rpcRequest({
                jsonrpc: '2.0',
                id: 1,
                method: 'platon_getUserOperationReceipt',
                params: [userOpHash]
            }, timeout);
        }
        throw new Error('bundlerApi is not set');
    }
    /**
     *
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout]
     * @return {Promise<String>} User operation
     * @memberof Bundler
     */
    async platon_getUserOperationByHash(userOpHash, timeout) {
        if (this._bundlerApiURL) {
            return this.rpcRequest({
                jsonrpc: '2.0',
                id: 1,
                method: 'platon_getUserOperationByHash',
                params: [userOpHash]
            }, timeout);
        }
        throw new Error('bundlerApi is not set');
    }
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    /**
     * send user operation via bundler
     *
     * @param {UserOperation} userOp
     * @param {number} [timeout] default 30s
     * @param {number} [receiptTimeout=0]
     * @param {number} [receiptInterval=1000 * 6]
     * @return {emitter} Event emitter
     * @memberof Bundler
     */
    sendUserOperation(userOp, timeout = 0, receiptTimeout = 0, receiptInterval = 1000 * 6) {
        const emitter = new events_1.EventEmitter();
        this.platon_sendUserOperation(userOp, timeout).then(async (userOpHash) => {
            emitter.emit('send', userOpHash);
            const startTime = Date.now();
            while (receiptTimeout === 0 || Date.now() - startTime < receiptTimeout) {
                // sleep 6s
                await this.sleep(receiptInterval);
                try {
                    const re = await this.platon_getUserOperationReceipt(userOpHash, timeout);
                    if (re) {
                        emitter.emit('receipt', re);
                        return;
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
            emitter.emit('timeout', new Error('receipt timeout'));
        }).catch((error) => {
            emitter.emit('error', error);
        });
        return emitter;
    }
    decodeExecutionResult(result) {
        // 	ExecutionResult(uint256,uint256,uint48,uint48,bool,bytes)	0x8b7ac980
        // error ExecutionResult(uint256 preOpGas, uint256 paid, uint48 validAfter, uint48 validUntil, bool targetSuccess, bytes targetResult);
        if (result.startsWith('0x8b7ac980')) {
            const re = utils_1.defaultAbiCoder.decode(['uint256', 'uint256', 'uint48', 'uint48', 'bool', 'bytes'], '0x' + result.substring(10));
            return {
                status: 0,
                result: {
                    preOpGas: re[0],
                    paid: re[1],
                    validAfter: re[2],
                    validUntil: re[3],
                    targetSuccess: re[4],
                    targetResult: re[5]
                }
            };
        }
        return null;
    }
    decodeFailedOp(result) {
        //error FailedOp(uint256 opIndex, string reason) 220266b6eadfd2
        if (result.startsWith('0x220266b6')) {
            const re = utils_1.defaultAbiCoder.decode(['uint256', 'string'], '0x' + result.substring(10));
            const failedOp = {
                opIndex: re[0],
                reason: re[1]
            };
            return {
                status: 1,
                result: failedOp
            };
        }
        ;
        return null;
    }
    decodeValidationResult(result) {
        // ValidationResult((uint256,uint256,uint256,uint256,bytes),(uint256,uint256),(uint256,uint256),(uint256,uint256))	0x3dd956e9if (result.startsWith('0x3dd956e9')) {
        if (result.startsWith('0xe0cff05f')) {
            const re = utils_1.defaultAbiCoder.decode(['(uint256,uint256,bool,uint48,uint48,bytes)', '(uint256,uint256)', '(uint256,uint256)', '(uint256,uint256)'], '0x' + result.substring(10));
            return {
                status: 0,
                result: {
                    returnInfo: {
                        preOpGas: re[0][0],
                        prefund: re[0][1],
                        sigFailed: re[0][2],
                        validAfter: re[0][3],
                        validUntil: re[0][4],
                        paymasterContext: re[0][5]
                    },
                    senderInfo: {
                        stake: re[1][0],
                        unstakeDelaySec: re[1][1]
                    },
                    factoryInfo: {
                        stake: re[2][0],
                        unstakeDelaySec: re[2][1]
                    },
                    paymasterInfo: {
                        stake: re[3][0],
                        unstakeDelaySec: re[3][1]
                    }
                }
            };
        }
        return null;
    }
    /**
     * simulateHandleOp
     * @param {UserOperation} op
     * @returns {Promise<Result>} result
     * @memberof Bundler
     */
    async simulateHandleOp(op, target = constants_1.AddressZero, targetCallData = '0x') {
        try {
            const result = await this._etherProvider.call({
                from: constants_1.AddressZero,
                to: this._entryPoint,
                data: new ethers_1.ethers.utils.Interface(entryPoint_1.EntryPointContract.ABI).encodeFunctionData("simulateHandleOp", [JSON.parse(op.toTuple()), target, targetCallData]),
            });
            let re = this.decodeExecutionResult(result);
            if (re)
                return re;
            re = this.decodeFailedOp(result);
            if (re)
                return re;
            return {
                status: 2,
                error: result
            };
        }
        catch (e) {
            console.error(e);
            return {
                status: 3,
                error: "call error"
            };
        }
    }
    /**
     * simulateValidation
     * @param {UserOperation} op
     * @returns {Promise<Result>} result
     * @memberof Bundler
     */
    async simulateValidation(op) {
        return this._simulateValidation(JSON.parse(op.toTuple()));
    }
    async _simulateValidation(op) {
        try {
            const data = new ethers_1.ethers.utils.Interface(entryPoint_1.EntryPointContract.ABI).encodeFunctionData("simulateValidation", [op]);
            const result = await this._etherProvider.call({
                //from: AddressZero,
                to: this._entryPoint,
                gasLimit: ethers_1.BigNumber.from(10e10),
                data: data
            });
            let re = this.decodeValidationResult(result);
            if (re)
                return re;
            re = this.decodeFailedOp(result);
            if (re)
                return re;
            return {
                status: 4,
                error: result
            };
        }
        catch (e) {
            debugger;
            console.error(e);
            return {
                status: 5,
                error: "call error"
            };
        }
    }
}
exports.Bundler = Bundler;
//# sourceMappingURL=bundle.js.map