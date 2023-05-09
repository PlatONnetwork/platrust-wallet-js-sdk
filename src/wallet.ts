import { getCreate2Address, hexlify, hexZeroPad, keccak256, defaultAbiCoder, BytesLike } from "ethers/lib/utils";
import { SingletonFactoryAddress, AddressZero, bytes32_zero } from "./config/constants";
import { UserOperation } from "./entities/userOperation";
import { Contract } from "./types/contract";
import { BaseWalletContract } from "./contracts/baseWallet";
import { PaymasterContract } from "./contracts/payMaster";
import { ERC1155, ERC20, ERC721, LAT } from "./entities/tokens";
import { Bundler } from './entities/bundle';
import { BigNumber, ContractInterface, ethers } from "ethers";
import { NumberLike } from "./utils/numberLike";
import { WalletFactoryContract } from "./contracts/walletFacroty";
import {ERC20 as erc20, executeFromModule} from "./types/abi";
import { JsonFragment, Fragment } from '@ethersproject/abi'
import { WalletProxyContract } from "./contracts/walletProxy";
import {SecurityManagerContract} from "./contracts/securityManager";
import {Operation} from "./types/operation";

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
     * @param { Number } threshold 钱包持有者的多签阈值
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
     * @param { Number } salt the salt number,default is 0
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
        const initCodeHash = keccak256(initCodeWithArgs);
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
     * check if the token is supported by paymaster
     * @param { ethers.providers.BaseProvider } etherProvider the ethers.js provider e.g. ethers.provider
     * @param { String } payMasterAddress paymaster contract address
     * @param { String[] } tokens token address list
     * @returns { String[] } supported token address list
     * @memberof BonusWalletLib
     */
    public async paymasterSupportedToken(etherProvider: ethers.providers.BaseProvider, payMasterAddress: string, tokens: string[]) {
        const paymaster = new ethers.Contract(payMasterAddress, PaymasterContract.ABI, etherProvider);
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
    public async getPaymasterExchangePrice(etherProvider: ethers.providers.BaseProvider,
                                           payMasterAddress: string, token: string, fetchTokenDecimals: boolean = false) {
        const paymaster = new ethers.Contract(payMasterAddress, PaymasterContract.ABI, etherProvider);

        if (await paymaster.isSupportedToken(token) === true) {
            const exchangePrice = await paymaster.exchangePrice(token);
            /*
                exchangePrice.decimals
                exchangePrice.price
            */
            const price: BigNumber = exchangePrice.price;
            const decimals: number = exchangePrice.decimals;
            let tokenDecimals: number | undefined;

            if (fetchTokenDecimals) {
                const erc20Token = new ethers.Contract(token, erc20, etherProvider);
                tokenDecimals = await erc20Token.decimals();
            }

            return {
                price,
                decimals,
                tokenDecimals
            };
        } else {
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
     * @param {Number} salt the salt number
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
     * @param {Number?} num the number
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
     * @param { Number } salt the salt number
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
     * @returns { Number } the next nonce number
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
