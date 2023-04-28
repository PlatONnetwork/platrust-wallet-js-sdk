"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOperation = exports.BonusWalletLib = void 0;
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("./config/constants");
const userOperation_1 = require("./entities/userOperation");
const baseWallet_1 = require("./contracts/baseWallet");
const payMaster_1 = require("./contracts/payMaster");
const tokens_1 = require("./entities/tokens");
const bundle_1 = require("./entities/bundle");
const ethers_1 = require("ethers");
const walletFacroty_1 = require("./contracts/walletFacroty");
const abi_1 = require("./types/abi");
const walletProxy_1 = require("./contracts/walletProxy");
class BonusWalletLib {
    /** @private */
    // private _deployFactory;
    /**
     * @type {Object}
     */
    // public Utils;
    /**
     * @constructor BonusWallet
     * @param { String? } singletonFactory the singletonFactory address
     * @returns { BonusWalletLib }
     * @memberof BonusWalletLib
     */
    constructor(singletonFactory) {
        this.Bundler = bundle_1.Bundler;
        this.Tokens = {
            ERC1155: new tokens_1.ERC1155(),
            ERC20: new tokens_1.ERC20(),
            ERC721: new tokens_1.ERC721(),
            LAT: new tokens_1.LAT()
        };
        singletonFactory = singletonFactory || constants_1.SingletonFactoryAddress;
        this._singletonFactory = singletonFactory;
        // this._deployFactory = new DeployFactory(singletonFactory);
        // this.Utils = {
        //     getNonce: this.getNonce,
        // DecodeCallData: DecodeCallData,
        // suggestedGasFee: CodefiGasFees,
        // tokenAndPaymaster: TokenAndPaymaster,
        // deployFactory: this._deployFactory,
        // fromTransaction: new Converter().fromTransaction
        // }
    }
    /**
     * get singletonFactory address
     * @returns { String } address
     */
    get singletonFactory() {
        return this._singletonFactory;
    }
    /**
     * get wallet setup data
     * @param { String } entryPoint  the entryPoint address
     * @param { [String] } owners 钱包的多个持有者，至少传入一个
     * @param { Number } threshold 钱包持有者的多签阈值
     * @param { String } to 钱包的 module 的调用 to 参数，
     * @param { String } data 钱包的 module 的调用 calldata 信息，
     * @param { String } fallbackHandler 钱包的 fallback 处理合约地址
     * @param { String } lockPeriod 钱包的锁定时长, 单位:(s)
     * @returns { String } setupCode
     * @memberof BonusWalletLib
     *
     */
    getSetupCode(entryPoint, owners, threshold, to, data, fallbackHandler, lockPeriod) {
        const iface = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI);
        const setupCode = iface.encodeFunctionData("setup", [entryPoint, owners, threshold, to, data, fallbackHandler, lockPeriod]);
        return setupCode;
    }
    /**
     * get wallet init code
     *
     * @param { string } walletFactory the wallet factory contract address
     * @param { string } walletLogic the wallet logic contract address
     * @param { string } initializer initializer data
     * @param { number } salt
     * @return { string } Init code data
     * @memberof BonusWalletLib
     */
    getInitCode(walletFactory, walletLogic, initializer, salt) {
        const iface = new ethers_1.ethers.utils.Interface(walletFacroty_1.WalletFactoryContract.ABI);
        const createWalletCode = iface.encodeFunctionData("createWallet", [walletLogic, initializer, salt]).substring(2);
        return walletFactory.toLowerCase() + createWalletCode;
        ;
    }
    /**
     * get wallet code
     *
     * @param {string} walletLogicAddress the wallet logic contract address
     * @param { string } initializer initializer data
     * @param {({
     *             contractInterface: ContractInterface,
     *             bytecode: BytesLike | { object: string }
     *         })} [walletProxyConfig] the wallet proxy config
     * @return {string} Wallet code
     * @memberof BonusWalletLib
     */
    getWalletCode(walletLogicAddress, initializer, walletProxyConfig) {
        if (!walletProxyConfig) {
            walletProxyConfig = {
                contractInterface: walletProxy_1.WalletProxyContract.ABI,
                bytecode: walletProxy_1.WalletProxyContract.bytecode
            };
        }
        const factory = new ethers_1.ethers.ContractFactory(walletProxyConfig.contractInterface, walletProxyConfig.bytecode);
        const walletBytecode = factory.getDeployTransaction(walletLogicAddress, initializer).data;
        return walletBytecode;
    }
    /**
     * calculate wallet address by owner address
     * @param { String } walletLogic the wallet logic contract address
     * @param { String } initializer  wallet setup code
     * @param { Number } salt the salt number,default is 0
     * @param { String } walletFactory the wallet factory contract address
     * @returns { String } the wallet address
     * @memberof BonusWalletLib
     */
    calculateWalletAddress(walletLogic, initializer, salt, walletFactory) {
        const initCodeWithArgs = this.getWalletCode(walletLogic, initializer);
        const initCodeHash = (0, utils_1.keccak256)(initCodeWithArgs);
        // newsalt = keccak256(abi.encodePacked(keccak256(_initializer), _salt));
        // ethers.utils.solidityPack // nodejs equivalent of solidity's abi.encodePacked
        const newSalt = ethers_1.ethers.utils.solidityKeccak256(['bytes', 'bytes32'], [(0, utils_1.keccak256)(initializer), salt]);
        const walletAddress = this.calculateWalletAddressByCodeHash(initCodeHash, newSalt, walletFactory);
        return walletAddress;
    }
    /**
     * get the userOperation for active (first time) the wallet
     * @param {String} walletLogic the wallet logic contract address
     * @param { String } initializer wallet setup code
     * @param {String} paymasterAndData the paymaster address and data
     * @param {Number?} salt the salt number,default is 0
     * @param { String } walletFactory the wallet factory contract address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The activate userOperation
     * @memberof BonusWalletLib
     */
    activateWalletOp(walletLogic, initializer, paymasterAndData, salt, walletFactory, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const walletAddress = this.calculateWalletAddress(walletLogic, initializer, salt, walletFactory);
        const initCode = this.getPackedInitCodeUsingWalletFactory(walletFactory, walletLogic, initializer, salt);
        const userOperation = new userOperation_1.UserOperation(walletAddress, 0, initCode, undefined, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas);
        return userOperation;
    }
    getPackedInitCodeUsingWalletFactory(walletFactory, walletLogic, initializer, salt) {
        const initCode = this.getInitCode(walletFactory, walletLogic, initializer, salt);
        const packedInitCode = ethers_1.ethers.utils.solidityPack(['address', 'bytes'], [walletFactory, initCode]);
        return packedInitCode;
    }
    /**
     * check if the token is supported by paymaster
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String } payMasterAddress paymaster contract address
     * @param { String[] } tokens token address list
     * @returns { String[] } supported token address list
     * @memberof BonusWalletLib
     */
    async paymasterSupportedToken(etherProvider, payMasterAddress, tokens) {
        const paymaster = new ethers_1.ethers.Contract(payMasterAddress, payMaster_1.PaymasterContract.ABI, etherProvider);
        const reqs = [];
        for (const token of tokens) {
            reqs.push(paymaster.isSupportedToken(token));
        }
        const results = await Promise.all(reqs);
        const supportedTokens = [];
        for (let i = 0; i < tokens.length; i++) {
            if (results[i] === true) {
                supportedTokens.push(tokens[i]);
            }
        }
        return supportedTokens;
    }
    /**
     * get paymaster exchange price
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String } payMasterAddress paymaster contract address
     * @param { String } token token address
     * @param { Boolean? } fetchTokenDecimals fetch token decimals or not
     * @returns { Object } exchange price
     * @memberof BonusWalletLib
     */
    async getPaymasterExchangePrice(etherProvider, payMasterAddress, token, fetchTokenDecimals = false) {
        const paymaster = new ethers_1.ethers.Contract(payMasterAddress, payMaster_1.PaymasterContract.ABI, etherProvider);
        if (await paymaster.isSupportedToken(token) === true) {
            const exchangePrice = await paymaster.exchangePrice(token);
            /*
                exchangePrice.decimals
                exchangePrice.price
            */
            const price = exchangePrice.price;
            const decimals = exchangePrice.decimals;
            let tokenDecimals;
            if (fetchTokenDecimals) {
                const erc20Token = new ethers_1.ethers.Contract(token, abi_1.ERC20, etherProvider);
                tokenDecimals = await erc20Token.decimals();
            }
            return {
                price,
                decimals,
                tokenDecimals
            };
        }
        else {
            throw new Error("token is not supported");
        }
    }
    /**
     * get paymaster data
     * @param { String } payMasterAddress paymaster contract address
     * @param { String } token token address
     * @param { BigNumber } maxCost token max cost
     * @returns { String } paymasterAndData(hex string)
     * @memberof BonusWalletLib
     */
    getPaymasterData(payMasterAddress, token, maxCost) {
        const enc = payMasterAddress.toLowerCase() + utils_1.defaultAbiCoder.encode(['address', 'uint256'], [token, maxCost]).substring(2);
        return enc;
    }
    /**
     * calculate wallet address
     * @param {IContract} initContract the init Contract
     * @param {any[] | undefined} initArgs the init args
     * @param {Number} salt the salt number
     * @returns {String} wallet address
     * @memberof BonusWalletLib
     */
    calculateWalletAddressByCode(initContract, initArgs, salt) {
        const factory = new ethers_1.ethers.ContractFactory(initContract.ABI, initContract.bytecode);
        const initCodeWithArgs = factory.getDeployTransaction(initArgs).data;
        const initCodeHash = (0, utils_1.keccak256)(initCodeWithArgs);
        return this.calculateWalletAddressByCodeHash(initCodeHash, salt);
    }
    /**
     * convert number to bytes32
     * @param {Number?} num the number
     * @returns {String} bytes32
     */
    number2Bytes32(num) {
        if (num === undefined) {
            return constants_1.bytes32_zero;
        }
        return (0, utils_1.hexZeroPad)((0, utils_1.hexlify)(num), 32);
    }
    /**
     * calculate wallet address
     * @param { String } initCodeHash the init code after keccak256
     * @param { Number } salt the salt number
     * @param { String? } singletonFactory the singleton factory address
     * @returns {String} the wallet address
     * @memberof BonusWalletLib
     */
    calculateWalletAddressByCodeHash(initCodeHash, salt, singletonFactory) {
        return (0, utils_1.getCreate2Address)(singletonFactory || this._singletonFactory, salt, initCodeHash);
    }
    /**
     * get nonce number from contract wallet
     * @param { String } walletAddress same as userOperation.sender
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String? } defaultBlock "earliest", "latest" and "pending"
     * @returns { Number } the next nonce number
     * @memberof BonusWalletLib
     */
    async getNonce(walletAddress, etherProvider, defaultBlock = 'latest') {
        try {
            const code = await etherProvider.getCode(walletAddress, defaultBlock);
            // check contract is exist
            if (code === '0x') {
                return 0;
            }
            else {
                const contract = new ethers_1.ethers.Contract(walletAddress, [{ "inputs": [], "name": "nonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }], etherProvider);
                const nonce = await contract.nonce();
                if (nonce === undefined) {
                    throw new Error('nonce is undefined');
                }
                return ethers_1.BigNumber.from(nonce).toNumber();
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BonusWalletLib = BonusWalletLib;
/**
 *
 */
BonusWalletLib.Defines = {
    AddressZero: constants_1.AddressZero,
    SingletonFactoryAddress: constants_1.SingletonFactoryAddress,
    bytes32_zero: constants_1.bytes32_zero
};
var userOperation_2 = require("./entities/userOperation");
Object.defineProperty(exports, "UserOperation", { enumerable: true, get: function () { return userOperation_2.UserOperation; } });
//# sourceMappingURL=wallet.js.map