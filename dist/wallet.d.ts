import { BytesLike } from "ethers/lib/utils";
import { UserOperation } from "./entities/userOperation";
import { Contract } from "./types/contract";
import { ERC1155, ERC20, ERC721, LAT } from "./entities/tokens";
import { Bundler } from './entities/bundle';
import { BigNumber, ContractInterface, ethers } from "ethers";
import { NumberLike } from "./utils/numberLike";
export declare class BonusWalletLib {
    /** @private */
    private _singletonFactory;
    /** @private */
    /**
     * @type {Object}
     */
    /**
     * @constructor BonusWallet
     * @param { String? } singletonFactory the singletonFactory address
     * @returns { BonusWalletLib }
     * @memberof BonusWalletLib
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
     * @param { Number } threshold 钱包持有者的多签阈值
     * @param { String } to 钱包的 module 的调用 to 参数，
     * @param { String } data 钱包的 module 的调用 calldata 信息，
     * @param { String } fallbackHandler 钱包的 fallback 处理合约地址
     * @param { String } lockPeriod 钱包的锁定时长, 单位:(s)
     * @returns { String } setupCode
     * @memberof BonusWalletLib
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
     * @memberof BonusWalletLib
     */
    getInitCode(walletFactory: string, walletLogic: string, initializer: string, salt: string): string;
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
    getWalletCode(walletLogicAddress: string, initializer: string, walletProxyConfig?: {
        contractInterface: ContractInterface;
        bytecode: BytesLike | {
            object: string;
        };
    }): string;
    /**
     * calculate wallet address by owner address
     * @param { String } walletLogic the wallet logic contract address
     * @param { String } initializer  wallet setup code
     * @param { Number } salt the salt number,default is 0
     * @param { String } walletFactory the wallet factory contract address
     * @returns { String } the wallet address
     * @memberof BonusWalletLib
     */
    calculateWalletAddress(walletLogic: string, initializer: string, salt: string, walletFactory: string): string;
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
    activateWalletOp(walletLogic: string, initializer: string, paymasterAndData: string | undefined, salt: string, walletFactory: string, maxFeePerGas: NumberLike, maxPriorityFeePerGas: NumberLike, callGasLimit: NumberLike, verificationGasLimit: NumberLike, preVerificationGas: NumberLike): UserOperation;
    private getPackedInitCodeUsingWalletFactory;
    /**
     * check if the token is supported by paymaster
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String } payMasterAddress paymaster contract address
     * @param { String[] } tokens token address list
     * @returns { String[] } supported token address list
     * @memberof BonusWalletLib
     */
    paymasterSupportedToken(etherProvider: ethers.providers.BaseProvider, payMasterAddress: string, tokens: string[]): Promise<string[]>;
    /**
     * get paymaster exchange price
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String } payMasterAddress paymaster contract address
     * @param { String } token token address
     * @param { Boolean? } fetchTokenDecimals fetch token decimals or not
     * @returns { Object } exchange price
     * @memberof BonusWalletLib
     */
    getPaymasterExchangePrice(etherProvider: ethers.providers.BaseProvider, payMasterAddress: string, token: string, fetchTokenDecimals?: boolean): Promise<{
        price: BigNumber;
        decimals: number;
        tokenDecimals: number | undefined;
    }>;
    /**
     * get paymaster data
     * @param { String } payMasterAddress paymaster contract address
     * @param { String } token token address
     * @param { BigNumber } maxCost token max cost
     * @returns { String } paymasterAndData(hex string)
     * @memberof BonusWalletLib
     */
    getPaymasterData(payMasterAddress: string, token: string, maxCost: BigNumber): string;
    /**
     * calculate wallet address
     * @param {IContract} initContract the init Contract
     * @param {any[] | undefined} initArgs the init args
     * @param {Number} salt the salt number
     * @returns {String} wallet address
     * @memberof BonusWalletLib
     */
    calculateWalletAddressByCode(initContract: Contract, initArgs: any[] | undefined, salt: string): string;
    /**
     * convert number to bytes32
     * @param {Number?} num the number
     * @returns {String} bytes32
     */
    number2Bytes32(num?: number): string;
    /**
     * calculate wallet address
     * @param { String } initCodeHash the init code after keccak256
     * @param { Number } salt the salt number
     * @param { String? } singletonFactory the singleton factory address
     * @returns {String} the wallet address
     * @memberof BonusWalletLib
     */
    private calculateWalletAddressByCodeHash;
    /**
     * get nonce number from contract wallet
     * @param { String } walletAddress same as userOperation.sender
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String? } defaultBlock "earliest", "latest" and "pending"
     * @returns { Number } the next nonce number
     * @memberof BonusWalletLib
     */
    private getNonce;
}
export { UserOperation } from "./entities/userOperation";
