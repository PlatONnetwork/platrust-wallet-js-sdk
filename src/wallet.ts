import { getCreate2Address, hexlify, hexZeroPad, keccak256, defaultAbiCoder, BytesLike } from "ethers/lib/utils";
import { SingletonFactoryAddress, AddressZero, bytes32_zero } from "./config/constants";
import { UserOperation } from "./entities/userOperation";
import { Contract } from "./types/contract";
import { BaseWalletContract } from "./contracts/baseWallet";
import { ERC1155, ERC20, ERC721, LAT } from "./entities/tokens";
import { Bundler } from './entities/bundle';
import { Paymaster } from './entities/paymaster';
import { BigNumber, ContractInterface, ethers } from "ethers";
import { NumberLike } from "./utils/numberLike";
import { WalletFactoryContract } from "./contracts/walletFacroty";
import { executeFromModule } from "./types/abi";
import { WalletProxyContract } from "./contracts/walletProxy";
import { SecurityManagerContract } from "./contracts/securityManager";
import { Operation } from "./types/operation";

export class BonusWalletLib {

    /** @private */
    private _singletonFactory;

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
    constructor(singletonFactory?: string) {
        singletonFactory = singletonFactory || SingletonFactoryAddress;

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
    public get singletonFactory() {
        return this._singletonFactory;
    }

    /**
     *
     */
    public static Defines = {
        AddressZero: AddressZero,
        SingletonFactoryAddress: SingletonFactoryAddress,
        bytes32_zero: bytes32_zero
    };


    public Bundler = Bundler;
    public Paymaster = Paymaster;

    public Tokens = {
        ERC1155: new ERC1155(),
        ERC20: new ERC20(),
        ERC721: new ERC721(),
        LAT: new LAT()
    };


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
     * @memberof BonusWalletLib
     *
     */
    public getSetupCode(
        entryPoint: string,
        owners: any[],
        threshold: number,
        to: string,
        data: string,
        fallbackHandler: string,
        lockPeriod: number,
    ) {
        const iface = new ethers.utils.Interface(BaseWalletContract.ABI);
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
    public getInitCode(
        walletFactory: string,
        walletLogic: string,
        initializer: string,
        salt: string
    ): string {
        const iface = new ethers.utils.Interface(WalletFactoryContract.ABI);
        const createWalletCode = iface.encodeFunctionData("createWallet", [walletLogic, initializer, salt]).substring(2);
        return walletFactory.toLowerCase() + createWalletCode;;
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
    public getWalletCode(
        walletLogicAddress: string,
        initializer: string,
        walletProxyConfig?: {
            contractInterface: ContractInterface,
            bytecode: BytesLike | { object: string }
        }): string {
        if (!walletProxyConfig) {
            walletProxyConfig = {
                contractInterface: WalletProxyContract.ABI,
                bytecode: WalletProxyContract.bytecode
            }
        }
        const factory = new ethers.ContractFactory(walletProxyConfig.contractInterface, walletProxyConfig.bytecode);
        const walletBytecode = factory.getDeployTransaction(walletLogicAddress).data;
        return walletBytecode as string;
    }

    /**
     * calculate wallet address by owner address
     * @param { String } walletLogic the wallet logic contract address
     * @param { String } initializer  wallet setup code
     * @param { number } salt the salt number,default is 0
     * @param { String } walletFactory the wallet factory contract address
     * @returns { String } the wallet address
     * @memberof BonusWalletLib
     */
    public calculateWalletAddress(
        walletLogic: string,
        initializer: string,
        salt: string,
        walletFactory: string
        ) {
        const initCodeWithArgs = this.getWalletCode(walletLogic, initializer);
        console.log('initCodeWithArgs: ', initCodeWithArgs)
        const initCodeHash = keccak256(initCodeWithArgs);
        console.log('initCodeHash: ', initCodeHash)
        // newsalt = keccak256(abi.encodePacked(keccak256(_initializer), _salt));
        // ethers.utils.solidityPack // nodejs equivalent of solidity's abi.encodePacked
        const newSalt = ethers.utils.solidityKeccak256(
            ['bytes', 'bytes32'],
            [keccak256(initializer), salt]
        )
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
     * @memberof BonusWalletLib
     */
    public activateWalletOp(
        walletLogic: string,
        initializer: string,
        paymasterAndData: string | undefined,
        salt: string,
        walletFactory: string,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const walletAddress = this.calculateWalletAddress(walletLogic, initializer, salt, walletFactory);
        const initCode = this.getPackedInitCodeUsingWalletFactory(
            walletFactory,
            walletLogic,
            initializer,
            salt,
        );
        const userOperation = new UserOperation(walletAddress, 0, initCode, undefined, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas);

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
     * @memberof BonusWalletLib
     */
    public async lockWalletOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    )  {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const lockOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("lock", []);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        lockOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return lockOp
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
     * @memberof BonusWalletLib
     */
    public async unlockWalletOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const unlockOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("unlock", []);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        unlockOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return unlockOp
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
     * @memberof BonusWalletLib
     */
    public async addOwnerWithThresholdOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        owner: string,
        threshold: number,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const addOwnerWithThresholdOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("addOwnerWithThreshold", [owner, threshold]);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        addOwnerWithThresholdOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return addOwnerWithThresholdOp
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
     * @memberof BonusWalletLib
     */
    public async removeOwnerOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        prevOwner: string,
        owner: string,
        threshold: number,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const removeOwnerOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("removeOwner", [prevOwner, owner, threshold]);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        removeOwnerOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return removeOwnerOp
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
     * @memberof BonusWalletLib
     */
    public async swapOwnerOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        prevOwner: string,
        oldOwner: string,
        newOwner: string,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const swapOwnerOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("swapOwner", [prevOwner, oldOwner, newOwner]);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        swapOwnerOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return swapOwnerOp
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
     * @memberof BonusWalletLib
     */
    public async changeThresholdOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        threshold: number,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const changeThresholdOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("changeThreshold", [threshold]);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        changeThresholdOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return changeThresholdOp
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
     * @memberof BonusWalletLib
     */
    public async withdrawDepositOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        withdrawAddress: string,
        amount: number,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const withdrawDepositOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("withdrawDepositTo", [withdrawAddress, amount]);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        withdrawDepositOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return withdrawDepositOp
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
     * @memberof BonusWalletLib
     */
    public async enableModuleOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        module: string,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const enableModuleOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("enableModule", [module]);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        enableModuleOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return enableModuleOp
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
     * @memberof BonusWalletLib
     */
    public async disableModuleOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        prevModule: string,
        module: string,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const disableModuleOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("disableModule", [prevModule, module]);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        disableModuleOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return disableModuleOp
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
     * @memberof BonusWalletLib
     */
    public async setFallbackHandlerOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        handler: string,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const setFallbackHandlerOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("setFallbackHandler", [handler]);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        setFallbackHandlerOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return setFallbackHandlerOp
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
     * @memberof BonusWalletLib
     */
    public async startSessionOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        sessionUser: string,
        duration: number,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const startSessionOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("startSession", [sessionUser, duration]);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        startSessionOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return startSessionOp
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
     * @memberof BonusWalletLib
     */
    public async clearSessionOp(
        walletAddress: string,
        etherProvider: ethers.providers.BaseProvider,
        paymasterAndData: string | undefined,
        maxFeePerGas: NumberLike,
        maxPriorityFeePerGas: NumberLike,
        callGasLimit: NumberLike,
        verificationGasLimit: NumberLike,
        preVerificationGas: NumberLike,
    ) {
        const nonce = await this.getNonce(walletAddress, etherProvider);
        const clearSessionOp = new UserOperation(walletAddress, nonce, '0x', '0x', callGasLimit, maxFeePerGas, maxPriorityFeePerGas, paymasterAndData, verificationGasLimit, preVerificationGas, '0x');

        let encodeABI = new ethers.utils.Interface(SecurityManagerContract.ABI).encodeFunctionData("clearSession", []);
        // console.log('encodeABI: ', encodeABI)
        const data = new ethers.utils.Interface(BaseWalletContract.ABI).encodeFunctionData("execute", [walletAddress, 0, encodeABI, Operation.CALL]);
        // console.log('data: ', data);
        clearSessionOp.callData = new ethers.utils.Interface(executeFromModule)
            .encodeFunctionData("executeFromModule",
                [data]);

        return clearSessionOp
    }

    /**
     * get if an module is enabled
     * @param {String} module module address
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } True if the module is enabled
     * @memberof BonusWalletLib
     */
    public async isEnabledModule(module: string, walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<boolean> {
        try {
            const contract = new ethers.Contract(walletAddress, BaseWalletContract.ABI, etherProvider);
            const enabled = await contract.isEnabledModule(module);
            return enabled
        } catch (error) {
            throw error;
        }
    }

    /**
     * get if an array of modules enabled
     * @param { String[] } modules array of moduls
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } True if an array of modules enabled
     * @memberof BonusWalletLib
     */
    public async isEnabledModules(modules: string[], walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<boolean> {
        try {
            const contract = new ethers.Contract(walletAddress, BaseWalletContract.ABI, etherProvider);
            const enabled = await contract.isEnabledModules(modules);
            return enabled
        } catch (error) {
            throw error;
        }
    }

    /**
     * get if an array of modules enabled
     * @param { String } start Start of the page. Has to be a module or start pointer (0x1 address)
     * @param { number } pageSize Maximum number of modules that should be returned. Has to be > 0
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Array } array Array of modules
     * @memberof BonusWalletLib
     */
    public async getModulesPaginated(start: string, pageSize: number, walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<any> {
        try {
            const contract = new ethers.Contract(walletAddress, BaseWalletContract.ABI, etherProvider);
            const modules = await contract.getModulesPaginated(start, pageSize);
            return modules
        } catch (error) {
            throw error;
        }
    }

    /**
     * get the number of required confirmations for a wallet transaction aka the threshold
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { number } Threshold number
     * @memberof BonusWalletLib
     */
    public async getThreshold(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<number> {
        try {
            const contract = new ethers.Contract(walletAddress, BaseWalletContract.ABI, etherProvider);
            const threshold = await contract.getThreshold();
            return threshold
        } catch (error) {
            throw error;
        }
    }

    /**
     * get a list of wallet owners
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Array } Array of wallet owners
     * @memberof BonusWalletLib
     */
    public async getOwners(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<Array<string>> {
        try {
            const contract = new ethers.Contract(walletAddress, BaseWalletContract.ABI, etherProvider);
            const owners = await contract.getOwners();
            return owners
        } catch (error) {
            throw error;
        }
    }

    /**
     * get if `owner` is an owner of the wallet
     * @param { String } owner query address param is wallet owner
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } if owner is an owner of the wallet
     * @memberof BonusWalletLib
     */
    public async isOwner(owner: string, walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<boolean> {
        try {
            const contract = new ethers.Contract(walletAddress, BaseWalletContract.ABI, etherProvider);
            const isOwner = await contract.isOwner(owner);
            return isOwner
        } catch (error) {
            throw error;
        }
    }

    /**
     * get wallet entrypoint address
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { String } wallet entryPoint address
     * @memberof BonusWalletLib
     */
    public async getEntryPoint(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<string> {
        try {
            const contract = new ethers.Contract(walletAddress, BaseWalletContract.ABI, etherProvider);
            const entryPoint = await contract.entryPoint();
            return entryPoint
        } catch (error) {
            throw error;
        }
    }

    private getPackedInitCodeUsingWalletFactory(
        walletFactory: string,
        walletLogic: string,
        initializer: string,
        salt: string,
        ) {
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
     * @memberof BonusWalletLib
     */
    public getPaymasterData(payMasterAddress: string, token: string, maxCost: BigNumber) {
        const enc = payMasterAddress.toLowerCase() + defaultAbiCoder.encode(
            ['address', 'uint256'],
            [token, maxCost]).substring(2)
        return enc;
    }

    /**
     * calculate wallet address
     * @param {IContract} initContract the init Contract
     * @param {any[] | undefined} initArgs the init args
     * @param {number} salt the salt number
     * @returns {String} wallet address
     * @memberof BonusWalletLib
     */
    public calculateWalletAddressByCode(
        initContract: Contract,
        initArgs: any[] | undefined,
        salt: string): string {
        const factory = new ethers.ContractFactory(initContract.ABI, initContract.bytecode);
        const initCodeWithArgs = factory.getDeployTransaction(initArgs).data as string;
        const initCodeHash = keccak256(initCodeWithArgs);
        return this.calculateWalletAddressByCodeHash(initCodeHash, salt);
    }


    /**
     * convert number to bytes32
     * @param {number?} num the number
     * @returns {String} bytes32
     */
    public number2Bytes32(num?: number) {
        if (num === undefined) {
            return bytes32_zero;
        }
        return hexZeroPad(hexlify(num), 32);
    }

    /**
     * calculate wallet address
     * @param { String } initCodeHash the init code after keccak256
     * @param { number } salt the salt number
     * @param { String? } singletonFactory the singleton factory address
     * @returns {String} the wallet address
     * @memberof BonusWalletLib
     */
    private calculateWalletAddressByCodeHash(
        initCodeHash: string,
        salt: string,
        singletonFactory?: string): string {

        return getCreate2Address(
            singletonFactory || this._singletonFactory,
            salt,
            initCodeHash);
    }


    /**
     * get nonce number from contract wallet
     * @param { String } walletAddress same as userOperation.sender
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String? } defaultBlock "earliest", "latest" and "pending"
     * @returns { number } the next nonce number
     * @memberof BonusWalletLib
     */
    public async getNonce(walletAddress: string, etherProvider: ethers.providers.BaseProvider, defaultBlock = 'latest'): Promise<number> {
        try {
            const code = await etherProvider.getCode(walletAddress, defaultBlock);
            // check contract is exist
            if (code === '0x') {
                return 0;
            } else {
                const contract = new ethers.Contract(walletAddress, [{ "inputs": [], "name": "nonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }], etherProvider);
                const nonce = await contract.nonce();
                if (nonce === undefined) {
                    throw new Error('nonce is undefined');
                }
                return BigNumber.from(nonce).toNumber();
            }

        } catch (error) {
            throw error;
        }
    }


}

export { UserOperation } from "./entities/userOperation";
