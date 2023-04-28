"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOperation = void 0;
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const numberLike_1 = require("../utils/numberLike");
const constants_1 = require("../config/constants");
const entryPoint_1 = require("../contracts/entryPoint");
const signatures_1 = require("../utils/signatures");
/**
 * @class UserOperation
 * @description UserOperation class
 * @property {String} sender the sender address
 * @property {NumberLike} nonce the nonce
 * @property {String} initCode the initCode
 * @property {String} callData the callData
 * @property {String} preVerificationGas the preVerificationGas
 * @property {String} verificationGasLimit the verificationGasLimit
 * @property {String} maxFeePerGas the maxFeePerGas
 * @property {String} maxPriorityFeePerGas the maxPriorityFeePerGas
 * @property {String} paymasterAndData the paymasterAndData
 * @property {String} signature the signature
 */
class UserOperation {
    /**
     * Creates an instance of UserOperation.
     * @param {string} [sender='']
     * @param {NumberLike} [nonce=0]
     * @param {string} [initCode='0x']
     * @param {string} [callData='0x']
     * @param {NumberLike} [callGasLimit=0]
     * @param {NumberLike} [maxFeePerGas=0]
     * @param {NumberLike} [maxPriorityFeePerGas=0]
     * @param {string} [paymasterAndData='0x']
     * @param {NumberLike} [verificationGasLimit=0]
     * @param {NumberLike} [preVerificationGas=0]
     * @param {string} [signature='0x']
     * @memberof UserOperation
     */
    constructor(sender = '', nonce = 0, initCode = '0x', callData = '0x', callGasLimit = 0, maxFeePerGas = 0, maxPriorityFeePerGas = 0, paymasterAndData = '0x', verificationGasLimit = 0, preVerificationGas = 0, signature = '0x') {
        this.DefaultGasOverheads = {
            fixed: 21000,
            perUserOp: 18300,
            perUserOpWord: 4,
            zeroByte: 4,
            nonZeroByte: 16,
            bundleSize: 1,
            sigSize: 65
        };
        this._sender = '';
        this._nonce = 0;
        this._initCode = '0x';
        this._callData = '0x';
        this._callGasLimit = 0;
        this._verificationGasLimit = 0; // 450000;
        this._preVerificationGas = 0; // 47000;
        this._maxFeePerGas = 0;
        this._maxPriorityFeePerGas = 0;
        this._paymasterAndData = '0x';
        this._signature = '0x';
        this._sender = sender;
        this._nonce = nonce;
        this._initCode = initCode;
        this._callData = callData;
        this._callGasLimit = callGasLimit;
        this._verificationGasLimit = verificationGasLimit;
        this._preVerificationGas = preVerificationGas;
        this._maxFeePerGas = maxFeePerGas;
        this._maxPriorityFeePerGas = maxPriorityFeePerGas;
        this._paymasterAndData = paymasterAndData;
        this._signature = signature;
    }
    get sender() {
        return this._sender;
    }
    set sender(value) {
        if (!ethers_1.ethers.utils.isAddress(value)) {
            throw new Error('invalid sender address');
        }
        this._sender = value;
    }
    get nonce() {
        return this._nonce;
    }
    set nonce(value) {
        this._nonce = value;
    }
    get initCode() {
        return this._initCode;
    }
    set initCode(value) {
        this._initCode = value;
    }
    get callData() {
        return this._callData;
    }
    set callData(value) {
        this._callData = value;
    }
    get callGasLimit() {
        return this._callGasLimit;
    }
    set callGasLimit(value) {
        this._callGasLimit = value;
    }
    get verificationGasLimit() {
        return this._verificationGasLimit;
    }
    set verificationGasLimit(value) {
        this._verificationGasLimit = value;
    }
    get preVerificationGas() {
        return this._preVerificationGas;
    }
    set preVerificationGas(value) {
        this._preVerificationGas = value;
    }
    get maxFeePerGas() {
        return this._maxFeePerGas;
    }
    set maxFeePerGas(value) {
        this._maxFeePerGas = value;
    }
    get maxPriorityFeePerGas() {
        return this._maxPriorityFeePerGas;
    }
    set maxPriorityFeePerGas(value) {
        this._maxPriorityFeePerGas = value;
    }
    get paymasterAndData() {
        return this._paymasterAndData;
    }
    set paymasterAndData(value) {
        this._paymasterAndData = value;
    }
    get signature() {
        return this._signature;
    }
    set signature(value) {
        this._signature = value;
    }
    /**
     * @description convert to userOperation tuple string
     * @returns {string} the userOperation tuple string
     * @memberof UserOperation
     */
    toTuple() {
        /*
        address sender;
        uint256 nonce;
        bytes initCode;
        bytes callData;
        uint callGas;
        uint verificationGas;
        uint preVerificationGas;
        uint maxFeePerGas;
        uint maxPriorityFeePerGas;
        address paymaster;
        bytes paymasterData;
        bytes signature;
        */
        return `["${this.sender.toLocaleLowerCase()}","${(0, numberLike_1.toDecString)(this.nonce)}","${this.initCode}","${this.callData}","${(0, numberLike_1.toDecString)(this.callGasLimit)}","${(0, numberLike_1.toDecString)(this.verificationGasLimit)}","${(0, numberLike_1.toDecString)(this.preVerificationGas)}","${(0, numberLike_1.toDecString)(this.maxFeePerGas)}","${(0, numberLike_1.toDecString)(this.maxPriorityFeePerGas)}","${this.paymasterAndData}","${this.signature}"]`;
    }
    /**
     * @description convert to userOperation struct
     * @returns {object} the userOperation struct
     * @memberof UserOperation
     */
    getStruct() {
        this.Serialized();
        return {
            sender: this.sender,
            nonce: this.nonce,
            initCode: this.initCode,
            callData: this.callData,
            callGasLimit: this.callGasLimit,
            verificationGasLimit: this.verificationGasLimit,
            preVerificationGas: this.preVerificationGas,
            maxFeePerGas: this.maxFeePerGas,
            maxPriorityFeePerGas: this.maxPriorityFeePerGas,
            paymasterAndData: this.paymasterAndData,
            signature: this.signature
        };
    }
    /**
     * @description convert NumberLike property to hex string
     * @returns {void}
     * @memberof UserOperation
     */
    Serialized() {
        this._nonce = (0, numberLike_1.toHexString)(this._nonce);
        this._callGasLimit = (0, numberLike_1.toHexString)(this._callGasLimit);
        this._verificationGasLimit = (0, numberLike_1.toHexString)(this._verificationGasLimit);
        this._preVerificationGas = (0, numberLike_1.toHexString)(this._preVerificationGas);
        this._maxFeePerGas = (0, numberLike_1.toHexString)(this._maxFeePerGas);
        this._maxPriorityFeePerGas = (0, numberLike_1.toHexString)(this._maxPriorityFeePerGas);
        this._paymasterAndData = this._paymasterAndData === constants_1.AddressZero ? '0x' : this._paymasterAndData;
    }
    /**
     * @description convert to userOperation json string
     * @returns {string} the userOperation json string
     * @memberof UserOperation
     */
    toJSON() {
        this.Serialized();
        return JSON.stringify({
            sender: this.sender,
            nonce: this.nonce,
            initCode: this.initCode,
            callData: this.callData,
            callGasLimit: this.callGasLimit,
            verificationGasLimit: this.verificationGasLimit,
            preVerificationGas: this.preVerificationGas,
            maxFeePerGas: this.maxFeePerGas,
            maxPriorityFeePerGas: this.maxPriorityFeePerGas,
            paymasterAndData: this.paymasterAndData,
            signature: this.signature
        });
    }
    /**
     * @description convert from userOperation json string
     * @param {string} json the userOperation json string
     * @returns {UserOperation} the userOperation object
     * @memberof UserOperation
     */
    static fromJSON(json) {
        const obj = JSON.parse(json);
        if (!obj || typeof obj !== 'object') {
            throw new Error('invalid json');
        }
        if (typeof obj.sender !== 'string') {
            throw new Error('invalid sender');
        }
        if (typeof obj.nonce !== 'string' && typeof obj.nonce !== 'number') {
            throw new Error('invalid nonce');
        }
        if (typeof obj.initCode !== 'string' || !obj.initCode.startsWith('0x')) {
            throw new Error('invalid initCode');
        }
        if (typeof obj.callData !== 'string' || !obj.callData.startsWith('0x')) {
            throw new Error('invalid callData');
        }
        if (typeof obj.callGasLimit !== 'string' && typeof obj.callGasLimit !== 'number') {
            throw new Error('invalid callGasLimit');
        }
        if (typeof obj.verificationGasLimit !== 'string' && typeof obj.verificationGasLimit !== 'number') {
            throw new Error('invalid verificationGasLimit');
        }
        if (typeof obj.preVerificationGas !== 'string' && typeof obj.preVerificationGas !== 'number') {
            throw new Error('invalid preVerificationGas');
        }
        if (typeof obj.maxFeePerGas !== 'string' && typeof obj.maxFeePerGas !== 'number') {
            throw new Error('invalid maxFeePerGas');
        }
        if (typeof obj.maxPriorityFeePerGas !== 'string' && typeof obj.maxPriorityFeePerGas !== 'number') {
            throw new Error('invalid maxPriorityFeePerGas');
        }
        if (typeof obj.paymasterAndData !== 'string' || !obj.paymasterAndData.startsWith('0x')) {
            throw new Error('invalid paymasterAndData');
        }
        if (typeof obj.signature !== 'string' || !obj.signature.startsWith('0x')) {
            throw new Error('invalid signature');
        }
        const userOp = new UserOperation(obj.sender, obj.nonce, obj.initCode, obj.callData, obj.callGasLimit, obj.maxFeePerGas, obj.maxPriorityFeePerGas, obj.paymasterAndData, obj.verificationGasLimit, obj.preVerificationGas, obj.signature);
        return userOp;
    }
    /**
     * @description convert from userOperation object
     * @param {object} obj the userOperation object
     * @returns {UserOperation} the userOperation object
     * @memberof UserOperation
     */
    static fromObject(obj) {
        if (!obj || typeof obj !== 'object') {
            throw new Error('invalid json');
        }
        if (typeof obj.sender !== 'string') {
            throw new Error('invalid sender');
        }
        if (typeof obj.nonce !== 'string' && typeof obj.nonce !== 'number') {
            throw new Error('invalid nonce');
        }
        if (typeof obj.initCode !== 'string' || !obj.initCode.startsWith('0x')) {
            throw new Error('invalid initCode');
        }
        if (typeof obj.callData !== 'string' || !obj.callData.startsWith('0x')) {
            throw new Error('invalid callData');
        }
        if (typeof obj.callGasLimit !== 'string' && typeof obj.callGasLimit !== 'number') {
            throw new Error('invalid callGasLimit');
        }
        if (typeof obj.verificationGasLimit !== 'string' && typeof obj.verificationGasLimit !== 'number') {
            throw new Error('invalid verificationGasLimit');
        }
        if (typeof obj.preVerificationGas !== 'string' && typeof obj.preVerificationGas !== 'number') {
            throw new Error('invalid preVerificationGas');
        }
        if (typeof obj.maxFeePerGas !== 'string' && typeof obj.maxFeePerGas !== 'number') {
            throw new Error('invalid maxFeePerGas');
        }
        if (typeof obj.maxPriorityFeePerGas !== 'string' && typeof obj.maxPriorityFeePerGas !== 'number') {
            throw new Error('invalid maxPriorityFeePerGas');
        }
        if (typeof obj.paymasterAndData !== 'string' || !obj.paymasterAndData.startsWith('0x')) {
            throw new Error('invalid paymasterAndData');
        }
        if (typeof obj.signature !== 'string' || !obj.signature.startsWith('0x')) {
            throw new Error('invalid signature');
        }
        const userOp = new UserOperation(obj.sender, obj.nonce, obj.initCode, obj.callData, obj.callGasLimit, obj.maxFeePerGas, obj.maxPriorityFeePerGas, obj.paymasterAndData, obj.verificationGasLimit, obj.preVerificationGas, obj.signature);
        return userOp;
    }
    /**
     * @description get the paymaster sign hash
     * @returns { string } the paymaster sign hash
     * @memberof UserOperation
     */
    payMasterSignHash() {
        return (0, utils_1.keccak256)(utils_1.defaultAbiCoder.encode([
            'address',
            'uint256',
            'bytes32',
            'bytes32',
            'uint256',
            'uint',
            'uint',
            'uint256',
            'uint256',
            'address', // paymaster
        ], [
            this.sender,
            this.nonce,
            (0, utils_1.keccak256)(this.initCode),
            (0, utils_1.keccak256)(this.callData),
            this.callGasLimit,
            this.verificationGasLimit,
            this.preVerificationGas,
            this.maxFeePerGas,
            this.maxPriorityFeePerGas,
            this.paymasterAndData.substring(0, 42),
        ]));
    }
    /**
     *
     *
     * @param { string } signature
     * @param { SignatureMode } [signatureMode=SignatureMode.owner]
     * @param { number } [validAfter=0]
     * @param { number } [validUntil=0]
     * @memberof UserOperation
     */
    signWithSignature(signature, signatureMode = signatures_1.SignatureMode.owner, validAfter = 0, validUntil = 0) {
        this.signature = (0, signatures_1.encodeSignature)(signatureMode, signature, validAfter, validUntil);
    }
    encode(typevalues, forSignature) {
        const types = typevalues.map(typevalue => typevalue.type === 'bytes' && forSignature ? 'bytes32' : typevalue.type);
        const values = typevalues.map((typevalue) => typevalue.type === 'bytes' && forSignature ? (0, utils_1.keccak256)(typevalue.val) : typevalue.val);
        return utils_1.defaultAbiCoder.encode(types, values);
    }
    packUserOp(forSignature = true) {
        // this.Serialized();
        if (forSignature) {
            // lighter signature scheme (must match UserOperation#pack): do encode a zero-length signature, but strip afterwards the appended zero-length value
            const userOpType = {
                components: [
                    { type: 'address', name: '_sender' },
                    { type: 'uint256', name: '_nonce' },
                    { type: 'bytes', name: '_initCode' },
                    { type: 'bytes', name: '_callData' },
                    { type: 'uint256', name: '_callGasLimit' },
                    { type: 'uint256', name: '_verificationGasLimit' },
                    { type: 'uint256', name: '_preVerificationGas' },
                    { type: 'uint256', name: '_maxFeePerGas' },
                    { type: 'uint256', name: '_maxPriorityFeePerGas' },
                    { type: 'bytes', name: '_paymasterAndData' },
                    { type: 'bytes', name: '_signature' }
                ],
                name: 'userOp',
                type: 'tuple'
            };
            let encoded = utils_1.defaultAbiCoder.encode([userOpType], [{ ...this, _signature: '0x' }]);
            // remove leading word (total length) and trailing word (zero-length signature)
            encoded = '0x' + encoded.slice(66, encoded.length - 64);
            return encoded;
        }
        const typevalues = [
            { type: 'address', val: this.sender },
            { type: 'uint256', val: this.nonce },
            { type: 'bytes', val: this.initCode },
            { type: 'bytes', val: this.callData },
            { type: 'uint256', val: this.callGasLimit },
            { type: 'uint256', val: this.verificationGasLimit },
            { type: 'uint256', val: this.preVerificationGas },
            { type: 'uint256', val: this.maxFeePerGas },
            { type: 'uint256', val: this.maxPriorityFeePerGas },
            { type: 'bytes', val: this.paymasterAndData }
        ];
        if (!forSignature) {
            // for the purpose of calculating gas cost, also hash signature
            typevalues.push({ type: 'bytes', val: this.signature });
        }
        return this.encode(typevalues, forSignature);
    }
    /**
     * @description get the UserOpHash (userOp hash)
     * @param { string } entryPointAddress the entry point address
     * @param { number } chainId the chain id
     * @returns { string } the UserOpHash (userOp hash)
     * @memberof UserOperation
     */
    getUserOpHash(entryPointAddress, chainId) {
        // keccak256(abi.encode(userOp.hash(), address(this), block.chainid));
        const userOpHash = (0, utils_1.keccak256)(this.packUserOp(true));
        const enc = utils_1.defaultAbiCoder.encode(['bytes32', 'address', 'uint256'], ["0x39aabc29008478ea05c3ca14ac9daa92bd321d6a46e8347620a7c04f67820621", entryPointAddress, chainId]);
        return (0, utils_1.keccak256)(enc);
    }
    /**
     * @description get the UserOpHash (userOp hash)
     * @param { string } entryPointAddress the entry point address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { string } defaultBlock default block
     * @returns { string } the UserOpHash (userOp hash)
     * @memberof UserOperation
     */
    async getUserOpHashFromContract(entryPointAddress, etherProvider, defaultBlock = 'latest') {
        // keccak256(abi.encode(userOp.hash(), address(this), block.chainid));
        try {
            const code = await etherProvider.getCode(entryPointAddress, defaultBlock);
            // check contract is exist
            if (code === '0x') {
                return '';
            }
            else {
                const contract = new ethers_1.ethers.Contract(entryPointAddress, entryPoint_1.EntryPointContract.ABI, etherProvider);
                const params = JSON.parse(this.toTuple());
                console.log('params: ', params.toString());
                const hash = await contract.getUserOpHash(params);
                return hash;
            }
        }
        catch (error) {
            throw error;
        }
    }
    callDataCost() {
        if (!ethers_1.ethers.utils.isAddress(this.sender)) {
            return 0;
        }
        const packed = ethers_1.ethers.utils.arrayify(this.packUserOp(false));
        const lengthInWord = (packed.length + 31) / 32;
        const callDataCost = packed.map(x => x === 0 ?
            this.DefaultGasOverheads.zeroByte :
            this.DefaultGasOverheads.nonZeroByte).reduce((sum, x) => sum + x);
        const ret = Math.round(callDataCost +
            this.DefaultGasOverheads.fixed / this.DefaultGasOverheads.bundleSize +
            this.DefaultGasOverheads.perUserOp +
            this.DefaultGasOverheads.perUserOpWord * lengthInWord);
        return ret;
    }
}
exports.UserOperation = UserOperation;
//# sourceMappingURL=userOperation.js.map