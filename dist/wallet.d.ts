import { BytesLike } from "ethers/lib/utils";
import { UserOperation } from "./entities/userOperation";
import { ERC1155, ERC20, ERC721, LAT } from "./entities/tokens";
import { Bundler } from './entities/bundle';
import { Paymaster } from './entities/paymaster';
import { BigNumber, ContractInterface, ethers } from "ethers";
import { NumberLike } from "./utils/numberLike";
export declare class WalletLib {
    /** @private */
    private _singletonFactory;
    /** @private */
    /**
     * @type {Object}
     */
    /**
     * @constructor Wallet
     * @param { String? } singletonFactory the singletonFactory address
     * @returns { WalletLib }
     * @memberof WalletLib
     */
    constructor(singletonFactory?: string);
    /**
     * get singletonFactory address
     * @returns { String } address
     */
    get singletonFactory(): string;
    /**
     *
     */
    static Defines: {
        AddressZero: string;
        SingletonFactoryAddress: string;
        bytes32_zero: string;
    };
    Bundler: typeof Bundler;
    Paymaster: typeof Paymaster;
    Tokens: {
        ERC1155: ERC1155;
        ERC20: ERC20;
        ERC721: ERC721;
        LAT: LAT;
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
     * @memberof WalletLib
     *
     */
    getSetupCode(entryPoint: string, owners: any[], threshold: number, to: string, data: string, fallbackHandler: string, lockPeriod: number): string;
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
    getInitCode(walletFactory: string, walletLogic: string, initializer: string, salt: string): string;
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
    getWalletCode(walletLogicAddress: string, walletProxyConfig?: {
        contractInterface: ContractInterface;
        bytecode: BytesLike | {
            object: string;
        };
    }): string;
    /**
     * calculate wallet address by owner address
     * @param { String } walletLogic the wallet logic contract address
     * @param { String } initializer  wallet setup code
     * @param { number } salt the salt number,default is 0
     * @param { String } walletFactory the wallet factory contract address
     * @returns { String } the wallet address
     * @memberof WalletLib
     */
    calculateWalletAddress(walletLogic: string, initializer: string, salt: string, walletFactory: string): string;
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
    activateWalletOp(walletLogic: string, initializer: string, paymasterAndData: string | undefined, salt: string, walletFactory: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): UserOperation;
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
    lockWalletOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    unlockWalletOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    addOwnerWithThresholdOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, owner: string, threshold: number, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    removeOwnerOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, prevOwner: string, owner: string, threshold: number, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    swapOwnerOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, prevOwner: string, oldOwner: string, newOwner: string, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    changeThresholdOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, threshold: number, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    withdrawDepositOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, withdrawAddress: string, amount: number, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    enableModuleOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, module: string, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    disableModuleOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, prevModule: string, module: string, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    setFallbackHandlerOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, handler: string, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    startSessionOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, sessionUser: string, duration: number, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
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
    clearSessionOp(walletAddress: string, etherProvider: ethers.providers.BaseProvider, paymasterAndData: string | undefined, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): Promise<UserOperation>;
    /**
     * get if an module is enabled
     * @param {String} module module address
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } True if the module is enabled
     * @memberof WalletLib
     */
    isEnabledModule(module: string, walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<boolean>;
    /**
     * get if an array of modules enabled
     * @param { String[] } modules array of moduls
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } True if an array of modules enabled
     * @memberof WalletLib
     */
    isEnabledModules(modules: string[], walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<boolean>;
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
    getModulesPaginated(start: string, pageSize: number, walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<any[]>;
    /**
     * get the number of required confirmations for a wallet transaction aka the threshold
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { number } Threshold number
     * @memberof WalletLib
     */
    getThreshold(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<number>;
    /**
     * get a list of wallet owners
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Array } Array of wallet owners
     * @memberof WalletLib
     */
    getOwners(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<Array<string>>;
    /**
     * get if `owner` is an owner of the wallet
     * @param { String } owner query address param is wallet owner
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } if owner is an owner of the wallet
     * @memberof WalletLib
     */
    isOwner(owner: string, walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<boolean>;
    /**
     * get wallet entrypoint address
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { String } wallet entryPoint address
     * @memberof WalletLib
     */
    getEntryPoint(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<string>;
    /**
     * Check if a wallet is locked
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { Boolean } Return true if a wallet is locked
     * @memberof WalletLib
     */
    isLocked(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<boolean>;
    /**
     * get the release time of a wallet lock
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { number } Return the release time of a wallet lock or 0 if the wallet is unlocked
     * @memberof WalletLib
     */
    getLock(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<number>;
    /**
     * Deposit more funds for this wallet in the entryPoint
     * @param { String } walletAddress the wallet contract address
     * @param {ethers.Wallet} signer the ethers.js wallet of call deposit
     * @param { String } value add deposit value, unit is lat
     * @returns { object } Return deposit transaction receipt
     * @memberof WalletLib
     */
    addDeposit(walletAddress: string, signer: ethers.Wallet, value: string): Promise<any>;
    /**
     * get the current wallet deposit in the entrypoint
     * @param { String } walletAddress the wallet contract address
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @returns { number } Return Amount of deposit
     * @memberof WalletLib
     */
    getDeposit(walletAddress: string, etherProvider: ethers.providers.BaseProvider): Promise<number>;
    private getPackedInitCodeUsingWalletFactory;
    /**
     * get paymaster data
     * @param { String } payMasterAddress paymaster contract address
     * @param { String } token token address
     * @param { BigNumber } maxCost token max cost
     * @returns { String } paymasterAndData(hex string)
     * @memberof WalletLib
     */
    getPaymasterData(payMasterAddress: string, token: string, maxCost: BigNumber): string;
    /**
     * convert number to bytes32
     * @param {number?} num the number
     * @returns {String} bytes32
     */
    number2Bytes32(num?: number): string;
    /**
     * calculate wallet address
     * @param { String } initCodeHash the init code after keccak256
     * @param { number } salt the salt number
     * @param { String? } singletonFactory the singleton factory address
     * @returns {String} the wallet address
     * @memberof WalletLib
     */
    private calculateWalletAddressByCodeHash;
    /**
     * get nonce number from contract wallet
     * @param { String } walletAddress same as userOperation.sender
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String? } defaultBlock "earliest", "latest" and "pending"
     * @returns { number } the next nonce number
     * @memberof WalletLib
     */
    getNonce(walletAddress: string, etherProvider: ethers.providers.BaseProvider, defaultBlock?: string): Promise<number>;
}
export { UserOperation } from "./entities/userOperation";
