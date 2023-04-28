import { ethers } from "ethers";
import { defaultAbiCoder, keccak256 } from 'ethers/lib/utils'
import { NumberLike, toDecString, toHexString } from "../utils/numberLike";
import { SerializedUserOperation } from "../types/userOperation";
import { AddressZero } from "../config/constants";
import { EntryPointContract } from "../contracts/entryPoint"
import { SignatureMode, encodeSignature } from "../utils/signatures";

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

export class UserOperation {

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
    constructor(sender: string = '', nonce: NumberLike = 0, initCode: string = '0x', callData: string = '0x', callGasLimit: NumberLike = 0, maxFeePerGas: NumberLike = 0, maxPriorityFeePerGas: NumberLike = 0, paymasterAndData: string = '0x', verificationGasLimit: NumberLike = 0, preVerificationGas: NumberLike = 0, signature: string = '0x') {
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

    private DefaultGasOverheads = {
        fixed: 21000,
        perUserOp: 18300,
        perUserOpWord: 4,
        zeroByte: 4,
        nonZeroByte: 16,
        bundleSize: 1,
        sigSize: 65
    }

    private _sender: string = '';

    public get sender(): string {
        return this._sender;
    }
    public set sender(value: string) {
        if (!ethers.utils.isAddress(value)) {
            throw new Error('invalid sender address');
        }
        this._sender = value;
    }
    private _nonce: NumberLike = 0;
    public get nonce(): NumberLike {
        return this._nonce;
    }
    public set nonce(value: NumberLike) {
        this._nonce = value;
    }
    private _initCode: string = '0x';
    public get initCode(): string {
        return this._initCode;
    }
    public set initCode(value: string) {
        this._initCode = value;
    }

    private _callData: string = '0x';
    public get callData(): string {
        return this._callData;
    }
    public set callData(value: string) {
        this._callData = value;
    }
    private _callGasLimit: NumberLike = 0;
    public get callGasLimit(): NumberLike {
        return this._callGasLimit;
    }
    public set callGasLimit(value: NumberLike) {
        this._callGasLimit = value;
    }
    private _verificationGasLimit: NumberLike = 0; // 450000;
    public get verificationGasLimit(): NumberLike {
        return this._verificationGasLimit;
    }
    public set verificationGasLimit(value: NumberLike) {
        this._verificationGasLimit = value;
    }
    private _preVerificationGas: NumberLike = 0; // 47000;
    public get preVerificationGas(): NumberLike {
        return this._preVerificationGas;
    }
    public set preVerificationGas(value: NumberLike) {
        this._preVerificationGas = value;
    }
    private _maxFeePerGas: NumberLike = 0;
    public get maxFeePerGas(): NumberLike {
        return this._maxFeePerGas;
    }
    public set maxFeePerGas(value: NumberLike) {
        this._maxFeePerGas = value;
    }
    private _maxPriorityFeePerGas: NumberLike = 0;
    public get maxPriorityFeePerGas(): NumberLike {
        return this._maxPriorityFeePerGas;
    }
    public set maxPriorityFeePerGas(value: NumberLike) {
        this._maxPriorityFeePerGas = value;
    }
    private _paymasterAndData: string = '0x';
    public get paymasterAndData(): string {
        return this._paymasterAndData;
    }
    public set paymasterAndData(value: string) {
        this._paymasterAndData = value;
    }
    private _signature: string = '0x';
    public get signature(): string {
        return this._signature;
    }
    public set signature(value: string) {
        this._signature = value;
    }



    /**
     * @description convert to userOperation tuple string
     * @returns {string} the userOperation tuple string
     * @memberof UserOperation
     */
    public toTuple(): string {
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
        return `["${this.sender.toLocaleLowerCase()}","${toDecString(this.nonce)}","${this.initCode}","${this.callData}","${toDecString(this.callGasLimit)}","${toDecString(this.verificationGasLimit)}","${toDecString(this.preVerificationGas)}","${toDecString(this.maxFeePerGas)}","${toDecString(this.maxPriorityFeePerGas)}","${this.paymasterAndData}","${this.signature}"]`;
    }

    /**
     * @description convert to userOperation struct
     * @returns {object} the userOperation struct
     * @memberof UserOperation
     */
    public getStruct(): SerializedUserOperation {
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
    public Serialized() {
        this._nonce = toHexString(this._nonce);
        this._callGasLimit = toHexString(this._callGasLimit);
        this._verificationGasLimit = toHexString(this._verificationGasLimit);
        this._preVerificationGas = toHexString(this._preVerificationGas);
        this._maxFeePerGas = toHexString(this._maxFeePerGas);
        this._maxPriorityFeePerGas = toHexString(this._maxPriorityFeePerGas);
        this._paymasterAndData = this._paymasterAndData === AddressZero ? '0x' : this._paymasterAndData;
    }

    /**
     * @description convert to userOperation json string
     * @returns {string} the userOperation json string
     * @memberof UserOperation
     */
    public toJSON(): string {
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
    public static fromJSON(json: string): UserOperation {
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
    public static fromObject(obj: any): UserOperation {
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
    public payMasterSignHash(): string {
        return keccak256(defaultAbiCoder.encode([
            'address', // sender
            'uint256', // nonce
            'bytes32', // initCode
            'bytes32', // callData
            'uint256', // callGas
            'uint', // verificationGas
            'uint', // preVerificationGas
            'uint256', // maxFeePerGas
            'uint256', // maxPriorityFeePerGas
            'address', // paymaster
        ], [
            this.sender,
            this.nonce,
            keccak256(this.initCode),
            keccak256(this.callData),
            this.callGasLimit,
            this.verificationGasLimit,
            this.preVerificationGas,
            this.maxFeePerGas,
            this.maxPriorityFeePerGas,
            this.paymasterAndData.substring(0, 42),
        ]))
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
    public signWithSignature(
        signature: string,
        signatureMode: SignatureMode = SignatureMode.owner,
        validAfter: number = 0,
        validUntil: number = 0,
    ) {
        this.signature = encodeSignature(signatureMode, signature, validAfter, validUntil)
    }

    private encode(typevalues: Array<{ type: string, val: any }>, forSignature: boolean): string {
        const types = typevalues.map(typevalue => typevalue.type === 'bytes' && forSignature ? 'bytes32' : typevalue.type)
        const values = typevalues.map((typevalue) => typevalue.type === 'bytes' && forSignature ? keccak256(typevalue.val) : typevalue.val)
        return defaultAbiCoder.encode(types, values)
    }

    public packUserOp(forSignature = true): string {
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
            }
            let encoded = defaultAbiCoder.encode([userOpType as any], [{ ...this, _signature: '0x' }]);
            // remove leading word (total length) and trailing word (zero-length signature)
            encoded = '0x' + encoded.slice(66, encoded.length - 64)
            return encoded
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
        ]
        if (!forSignature) {
            // for the purpose of calculating gas cost, also hash signature
            typevalues.push({ type: 'bytes', val: this.signature })
        }
        return this.encode(typevalues, forSignature)
    }

    /**
     * @description get the UserOpHash (userOp hash)
     * @param { string } entryPointAddress the entry point address
     * @param { number } chainId the chain id
     * @returns { string } the UserOpHash (userOp hash)
     * @memberof UserOperation
     */
    public getUserOpHash(entryPointAddress: string, chainId: number): string {
        // keccak256(abi.encode(userOp.hash(), address(this), block.chainid));
        const userOpHash = keccak256(this.packUserOp(true));
        const enc = defaultAbiCoder.encode(
            ['bytes32', 'address', 'uint256'],
            ["0x39aabc29008478ea05c3ca14ac9daa92bd321d6a46e8347620a7c04f67820621", entryPointAddress, chainId])
        return keccak256(enc)
    }

    /**
     * @description get the UserOpHash (userOp hash)
     * @param { string } entryPointAddress the entry point address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { string } defaultBlock default block
     * @returns { string } the UserOpHash (userOp hash)
     * @memberof UserOperation
     */
    public async getUserOpHashFromContract(entryPointAddress: string, etherProvider: ethers.providers.BaseProvider, defaultBlock = 'latest'): Promise<string> {
        // keccak256(abi.encode(userOp.hash(), address(this), block.chainid));
        try {
            const code = await etherProvider.getCode(entryPointAddress, defaultBlock);
            // check contract is exist
            if (code === '0x') {
                return '';
            } else {
                const contract = new ethers.Contract(entryPointAddress,  EntryPointContract.ABI, etherProvider);
                const params = JSON.parse(this.toTuple())
                console.log('params: ', params.toString())
                const hash = await contract.getUserOpHash(params);
                return hash;
            }

        } catch (error) {
            throw error;
        }
    }

    public callDataCost(): number {
        if (!ethers.utils.isAddress(this.sender)) {
            return 0;
        }

        const packed = ethers.utils.arrayify(this.packUserOp(false));

        const lengthInWord = (packed.length + 31) / 32
        const callDataCost = packed.map(x =>
            x === 0 ?
                this.DefaultGasOverheads.zeroByte :
                this.DefaultGasOverheads.nonZeroByte
        ).reduce((sum, x) => sum + x)
        const ret = Math.round(
            callDataCost +
            this.DefaultGasOverheads.fixed / this.DefaultGasOverheads.bundleSize +
            this.DefaultGasOverheads.perUserOp +
            this.DefaultGasOverheads.perUserOpWord * lengthInWord
        )
        return ret;
    }
}
