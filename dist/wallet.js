"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOperation = exports.WalletLib = void 0;
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("./config/constants");
const userOperation_1 = require("./entities/userOperation");
const baseWallet_1 = require("./contracts/baseWallet");
const tokens_1 = require("./entities/tokens");
const bundle_1 = require("./entities/bundle");
const paymaster_1 = require("./entities/paymaster");
const ethers_1 = require("ethers");
const walletFacroty_1 = require("./contracts/walletFacroty");
const abi_1 = require("./types/abi");
const walletProxy_1 = require("./contracts/walletProxy");
const securityManager_1 = require("./contracts/securityManager");
class WalletLib {
    /** @private */
    // private _deployFactory;
    /**
     * @type {Object}
     */
    // public Utils;
    /**
     * @constructor Wallet
     * @param { String? } singletonFactory the singletonFactory address
     * @returns { WalletLib }
     * @memberof WalletLib
     */
    constructor(singletonFactory) {
        this.Bundler = bundle_1.Bundler;
        this.Paymaster = paymaster_1.Paymaster;
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
     * @param { number } threshold 钱包持有者的多签阈值
     * @param { String } to 钱包的 module 的调用 to 参数，
     * @param { String } data 钱包的 module 的调用 calldata 信息，
     * @param { String } fallbackHandler 钱包的 fallback 处理合约地址
     * @param { String } lockPeriod 钱包的锁定时长, 单位:(s)
     * @returns { String } setupCode
     * @memberof WalletLib
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
     * @memberof WalletLib
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
     * @param {({
     *             contractInterface: ContractInterface,
     *             bytecode: BytesLike | { object: string }
     *         })} [walletProxyConfig] the wallet proxy config
     * @return {string} Wallet code
     * @memberof WalletLib
     */
    getWalletCode(walletLogicAddress, walletProxyConfig) {
        if (!walletProxyConfig) {
            walletProxyConfig = {
                contractInterface: walletProxy_1.WalletProxyContract.ABI,
                bytecode: walletProxy_1.WalletProxyContract.bytecode
            };
        }
        const factory = new ethers_1.ethers.ContractFactory(walletProxyConfig.contractInterface, walletProxyConfig.bytecode);
        const walletBytecode = factory.getDeployTransaction(walletLogicAddress).data;
        return walletBytecode;
    }
    /**
     * calculate wallet address by owner address
     * @param { String } walletLogic the wallet logic contract address
     * @param { String } initializer  wallet setup code
     * @param { number } salt the salt number,default is 0
     * @param { String } walletFactory the wallet factory contract address
     * @returns { String } the wallet address
     * @memberof WalletLib
     */
    calculateWalletAddress(walletLogic, initializer, salt, walletFactory) {
        const initCodeWithArgs = this.getWalletCode(walletLogic);
        console.log('initCodeWithArgs: ', initCodeWithArgs);
        const initCodeHash = (0, utils_1.keccak256)(initCodeWithArgs);
        // console.log('initCodeHash: ', initCodeHash)
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
     * @param {number?} salt the salt number,default is 0
     * @param { String } walletFactory the wallet factory contract address
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The activate userOperation
     * @memberof WalletLib
     */
    activateWalletOp(walletLogic, initializer, paymasterAndData, salt, walletFactory, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const walletAddress = this.calculateWalletAddress(walletLogic, initializer, salt, walletFactory);
        const initCode = this.getPackedInitCodeUsingWalletFactory(walletFactory, walletLogic, initializer, salt);
        const userOperation = new userOperation_1.UserOperation(walletAddress, 0, initCode, undefined, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas);
        return userOperation;
    }
    /**
     * get the userOperation for lock the wallet
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The lockWallet userOperation
     * @memberof WalletLib
     */
    async lockWalletOp(walletAddress, etherProvider, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const lockOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(securityManager_1.SecurityManagerContract.ABI).encodeFunctionData("lock", []);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        lockOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return lockOp;
    }
    /**
     * get the userOperation for unlock the wallet
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The unlockWallet userOperation
     * @memberof WalletLib
     */
    async unlockWalletOp(walletAddress, etherProvider, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const unlockOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(securityManager_1.SecurityManagerContract.ABI).encodeFunctionData("unlock", []);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        unlockOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return unlockOp;
    }
    /**
     * get the userOperation for adds owner to the wallet and updates the threshold
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} owner add owner address
     * @param { number } threshold add threshold
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The addOwnerWithThresholdOp userOperation
     * @memberof WalletLib
     */
    async addOwnerWithThresholdOp(walletAddress, etherProvider, owner, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const addOwnerWithThresholdOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("addOwnerWithThreshold", [owner, threshold]);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        addOwnerWithThresholdOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return addOwnerWithThresholdOp;
    }
    /**
     * get the userOperation for remove the owner from the wallet and update threshold
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} prevOwner owner address that pointed to the owner to be removed in the linked list
     * @param {String} owner owner address to be removed
     * @param { number } threshold new threshold
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The removeOwnerOp userOperation
     * @memberof WalletLib
     */
    async removeOwnerOp(walletAddress, etherProvider, prevOwner, owner, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const removeOwnerOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("removeOwner", [prevOwner, owner, threshold]);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        removeOwnerOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return removeOwnerOp;
    }
    /**
     * get the userOperation for replace the owner in the wallet
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} prevOwner owner address that pointed to the owner to be removed in the linked list
     * @param {String} oldOwner owner address to be replaced
     * @param { String } newOwner new owner address
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The swapOwnerOp userOperation
     * @memberof WalletLib
     */
    async swapOwnerOp(walletAddress, etherProvider, prevOwner, oldOwner, newOwner, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const swapOwnerOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("swapOwner", [prevOwner, oldOwner, newOwner]);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        swapOwnerOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return swapOwnerOp;
    }
    /**
     * get the userOperation for change the threshold of the wallet
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} threshold new threshold
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The changeThresholdOp userOperation
     * @memberof WalletLib
     */
    async changeThresholdOp(walletAddress, etherProvider, threshold, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const changeThresholdOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("changeThreshold", [threshold]);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        changeThresholdOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return changeThresholdOp;
    }
    /**
     * get the userOperation for withdraw value from wallet's deposit
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {string} withdrawAddress target address to send to.
     * @param {number} amount amount of deposit to withdraw
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The withdrawDepositOp userOperation
     * @memberof WalletLib
     */
    async withdrawDepositOp(walletAddress, etherProvider, withdrawAddress, amount, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const withdrawDepositOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("withdrawDepositTo", [withdrawAddress, amount]);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        withdrawDepositOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return withdrawDepositOp;
    }
    /**
     * get the userOperation for enable the module for the wallet
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} module module to be whitelisted
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The enableModuleOp userOperation
     * @memberof WalletLib
     */
    async enableModuleOp(walletAddress, etherProvider, module, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const enableModuleOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("enableModule", [module]);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        enableModuleOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return enableModuleOp;
    }
    /**
     * get the userOperation for disable the module for the wallet
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} prevModule previous module in the modules linked list
     * @param {String} module module to be removed
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The disableModuleOp userOperation
     * @memberof WalletLib
     */
    async disableModuleOp(walletAddress, etherProvider, prevModule, module, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const disableModuleOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("disableModule", [prevModule, module]);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        disableModuleOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return disableModuleOp;
    }
    /**
     * get the userOperation for set fallback handler for the wallet
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} handler contract to handle fallback calls
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The setFallbackHandlerOp userOperation
     * @memberof WalletLib
     */
    async setFallbackHandlerOp(walletAddress, etherProvider, handler, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const setFallbackHandlerOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("setFallbackHandler", [handler]);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        setFallbackHandlerOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return setFallbackHandlerOp;
    }
    /**
     * get the userOperation for start session for user
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} sessionUser use session for the user
     * @param {number} duration session duration
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The startSessionOp userOperation
     * @memberof WalletLib
     */
    async startSessionOp(walletAddress, etherProvider, sessionUser, duration, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const startSessionOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("startSession", [sessionUser, duration]);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        startSessionOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return startSessionOp;
    }
    /**
     * get the userOperation for clear session
     * @param {String} walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param {String} paymasterAndData the paymaster address and data
     * @param { NumberLike } maxFeePerGas the max fee per gas
     * @param { NumberLike } maxPriorityFeePerGas the max priority fee per gas
     * @param { NumberLike } callGasLimit call gas limit
     * @param { NumberLike } verificationGasLimit verification gas limit
     * @param { NumberLike } preVerificationGas preVerification gas
     * @returns { UserOperation } The clearSessionOp userOperation
     * @memberof WalletLib
     */
    async clearSessionOp(walletAddress, etherProvider, paymasterAndData, maxFeePerGas, maxPriorityFeePerGas, callGasLimit, verificationGasLimit, preVerificationGas) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const clearSessionOp = new userOperation_1.UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');
        const data = new ethers_1.ethers.utils.Interface(baseWallet_1.BaseWalletContract.ABI).encodeFunctionData("clearSession", []);
        // console.log('encodeABI: ', encodeABI)
        // const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        clearSessionOp.callData = new ethers_1.ethers.utils.Interface(abi_1.executeFromModule)
            .encodeFunctionData("executeFromModule", [data]);
        return clearSessionOp;
    }
    /**
     * get if an module is enabled
     * @param {String} module module address
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } True if the module is enabled
     * @memberof WalletLib
     */
    async isEnabledModule(module, walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const enabled = await contract.isEnabledModule(module);
            return enabled;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * get if an array of modules enabled
     * @param { String[] } modules array of moduls
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } True if an array of modules enabled
     * @memberof WalletLib
     */
    async isEnabledModules(modules, walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const enabled = await contract.isEnabledModules(modules);
            return enabled;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * get if an array of modules enabled
     * @param { String } start Start of the page. Has to be a module or start pointer (0x1 address)
     * @param { number } pageSize Maximum number of modules that should be returned. Has to be > 0
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Array<any> } Returns an array object with a length of 2, the first element is the modules array, and the second element is the starting point of the next page
     *
     * @examples:
     * ```
     * [
     *   [
     *     '0x3C4e46647aDBca88D6224fD0b9CD94cfB2F053F3',
     *     '0x0A531888Fd14243aB544a41fAd8f2C7E3Fd21D94'
     *     ],
     *     '0x0000000000000000000000000000000000000001'
     * ]
     * ```
     * @memberof WalletLib
     */
    async getModulesPaginated(start, pageSize, walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const modules = await contract.getModulesPaginated(start, pageSize);
            return modules;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * get the number of required confirmations for a wallet transaction aka the threshold
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { number } Threshold number
     * @memberof WalletLib
     */
    async getThreshold(walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const threshold = await contract.getThreshold();
            return threshold;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * get a list of wallet owners
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Array } Array of wallet owners
     * @memberof WalletLib
     */
    async getOwners(walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const owners = await contract.getOwners();
            return owners;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * get if `owner` is an owner of the wallet
     * @param { String } owner query address param is wallet owner
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } if owner is an owner of the wallet
     * @memberof WalletLib
     */
    async isOwner(owner, walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const isOwner = await contract.isOwner(owner);
            return isOwner;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * get wallet entrypoint address
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { String } wallet entryPoint address
     * @memberof WalletLib
     */
    async getEntryPoint(walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const entryPoint = await contract.entryPoint();
            return entryPoint;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Check if a wallet is locked
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } Return true if a wallet is locked
     * @memberof WalletLib
     */
    async isLocked(walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const isLocked = await contract.isLocked();
            return isLocked;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * get the release time of a wallet lock
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { number } Return the release time of a wallet lock or 0 if the wallet is unlocked
     * @memberof WalletLib
     */
    async getLock(walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const lockTime = await contract.getLock();
            return lockTime;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Deposit more funds for this wallet in the entryPoint
     * @param { String } walletAddress the wallet contract address
     * @param {ethers.Wallet} signer the ethers.js wallet of call deposit
     * @param { String } value add deposit value, unit is lat
     * @returns { object } Return deposit transaction receipt
     * @memberof WalletLib
     */
    async addDeposit(walletAddress, signer, value) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, signer);
            const tx = await contract.addDeposit({ value: ethers_1.ethers.utils.parseEther(value) });
            return tx;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * get the current wallet deposit in the entrypoint
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { number } Return Amount of deposit
     * @memberof WalletLib
     */
    async getDeposit(walletAddress, etherProvider) {
        try {
            const contract = new ethers_1.ethers.Contract(walletAddress, baseWallet_1.BaseWalletContract.ABI, etherProvider);
            const deposit = await contract.getDeposit();
            return deposit;
        }
        catch (error) {
            throw error;
        }
    }
    getPackedInitCodeUsingWalletFactory(walletFactory, walletLogic, initializer, salt) {
        const initCode = this.getInitCode(walletFactory, walletLogic, initializer, salt);
        // const packedInitCode = ethers.utils.solidityPack(
        //     ['address', 'bytes'],
        //     [walletFactory, initCode]
        // )
        // return packedInitCode;
        return initCode;
    }
    /**
     * get paymaster data
     * @param { String } payMasterAddress paymaster contract address
     * @param { String } token token address
     * @param { BigNumber } maxCost token max cost
     * @returns { String } paymasterAndData(hex string)
     * @memberof WalletLib
     */
    getPaymasterData(payMasterAddress, token, maxCost) {
        const enc = payMasterAddress.toLowerCase() + utils_1.defaultAbiCoder.encode(['address', 'uint256'], [token, maxCost]).substring(2);
        return enc;
    }
    // /**
    //  * calculate wallet address
    //  * @param {IContract} initContract the init Contract(walletProxy contract)
    //  * @param {any[] | undefined} initArgs the init args(walletProxy contract init args, is wallet logic address)
    //  * @param { String } initializer  wallet setup code
    //  * @param { String } walletFactory the wallet factory contract address
    //  * @param {number} salt the salt number
    //  * @returns {String} wallet address
    //  * @memberof WalletLib
    //  */
    // public calculateWalletAddressByCode(
    //     initContract: Contract,
    //     initArgs: any | undefined,
    //     initializer: string,
    //     walletFactory: string,
    //     salt: string): string {
    //     const factory = new ethers.ContractFactory(initContract.ABI, initContract.bytecode);
    //     const initCodeWithArgs = factory.getDeployTransaction(initArgs).data as string;
    //     const initCodeHash = keccak256(initCodeWithArgs);
    //     const newSalt = ethers.utils.solidityKeccak256(
    //         ['bytes', 'bytes32'],
    //         [keccak256(initializer), salt]
    //     )
    //     return this.calculateWalletAddressByCodeHash(initCodeHash, newSalt, walletFactory);
    // }
    /**
     * convert number to bytes32
     * @param {number?} num the number
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
     * @param { number } salt the salt number
     * @param { String? } singletonFactory the singleton factory address
     * @returns {String} the wallet address
     * @memberof WalletLib
     */
    calculateWalletAddressByCodeHash(initCodeHash, salt, singletonFactory) {
        return (0, utils_1.getCreate2Address)(singletonFactory || this._singletonFactory, salt, initCodeHash);
    }
    /**
     * get nonce number from contract wallet
     * @param { String } walletAddress same as userOperation.sender
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String? } defaultBlock "earliest", "latest" and "pending"
     * @returns { number } the next nonce number
     * @memberof WalletLib
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
exports.WalletLib = WalletLib;
/**
 *
 */
WalletLib.Defines = {
    AddressZero: constants_1.AddressZero,
    SingletonFactoryAddress: constants_1.SingletonFactoryAddress,
    bytes32_zero: constants_1.bytes32_zero
};
var userOperation_2 = require("./entities/userOperation");
Object.defineProperty(exports, "UserOperation", { enumerable: true, get: function () { return userOperation_2.UserOperation; } });
//# sourceMappingURL=wallet.js.map