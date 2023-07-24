import { ethers } from "ethers";
import { SignatureMode } from "../utils/signatures";
import { AddressZero } from "../config/constants";
import {
    WalletLib,
    packSignatureHash,
    signMessage,
    encodeSignature,
    recoverAddress,
    UserOperationReceipt
} from '../index';

async function main() {
    const pks = ['0x23eb17bebbc219e9866a7f5303e6c7f59da0fd930e19483e5e54af7ff1a42a43', '0xdaa5375a4b3d05cab2c17e474e1fb084bbd2a837488828d0a5f0a9f1323e25bc', '0x628acd12bc0cb6ecd71a9f9cd5eddfa92f57aa62791d49a779b3865615ad4b6b']
    let owners = ['0x3136142DEda2340dc2aC12c37F6D584652E056F1', '0x44Af20AB6335CDE46F7D73f88cf6b23CA8D8a286', '0xF609B9a73D1f53fd0Ec93D2b99F0174cfdeDc3Ac']

    const chainURL = 'http://192.168.21.119:8801'
    const bundleURL = 'http://192.168.21.119:9901'

    const walletLib = new WalletLib();
    const walletLogic = '0x7426C8f418de1EAf202956C8106B375b2B4ad088'
    const walletFactory = '0x607A33F156377BF4C27b799CA1B524F24EacE297' // wallet proxy factory contract address
    const relayerManagerAddr = '0x82c687F650994797c080C5038E2957fa03D38B4C'
    const salt = '0x46a31f1f917570aa8a60b2339f1a0469cbce2feb53c705746446981548845b3b'
    console.log("relayer: ", relayerManagerAddr);

    const initializer = await walletLib.getSetupCode(
        relayerManagerAddr,   // <address> EntryPoint Contract Address
        owners, // <[address]> owner Address List
        2,       // <number> threshold
        AddressZero,  // <address> to Address
        '0x',  // <string> wallet init execute data
        AddressZero,  // <string> fallbackHandler
        86400,      // <number> lockPerid
    )
    const walletAddress = await walletLib.calculateWalletAddress(
        walletLogic,  // <address> BonusWalletLogic Contract Address
        initializer,  // <string> initializer
        salt,     // <string> salt (Hex string)
        walletFactory  // <address> wallet Factory Address
    );
    console.log('initializer: ', initializer)
    console.log("wallet: ", walletAddress);
    console.log("factory: ", walletFactory);
    console.log("wallet logic: ", walletLogic);
    const initcode = walletLib.getInitCode(walletFactory, walletLogic, initializer, salt)
    console.log("init code: ", initcode)
    const activateOp = walletLib.activateWalletOp(
        walletLogic,  // <address> BonusWallet Logic Contract Address
        initializer,  // <string> initializer
        undefined,   // <bytes> paymasterAndData
        salt,     // <string> salt (Hex string)
        walletFactory,  // <address> Wallet factory Contract Address
        100,// <number> maxFeePerGas 100Gwei
        1000,// <number> maxPriorityFeePerGas 10Gwei
        5000000,
        500000,
        100000
    );
    console.log("user op: ", activateOp.toTuple());
    const userOpHash = await activateOp.getUserOpHashFromContract(
        relayerManagerAddr,  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider( chainURL),  // ethers.providers
    );
    console.log("userOpHash: ", userOpHash);
    const signedHash = packSignatureHash(userOpHash, SignatureMode.owner, 0, 0);

    console.log("signedMsg: ", signedHash);

    let sigs = '0x'
    for (var i = 0; i < pks.length; i++) {
        const sig = signMessage(signedHash, pks[i])
        sigs = ethers.utils.solidityPack(
            ['bytes', 'bytes'],
            [sigs, sig]
        )
    }
    console.log('sig: ', sigs)
    activateOp.signature = encodeSignature(SignatureMode.owner, sigs, 0, 0);
    console.log("signature: ", activateOp.signature);
    // console.log('activateOp: ', activateOp.toJSON())

    const bundler = new walletLib.Bundler(
        relayerManagerAddr,  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider(chainURL),
        bundleURL
    );
    const entryPoints = await bundler.platon_supportedEntryPoints()
    console.log('entry points: ', entryPoints)

    const validation = await bundler.simulateHandleOp(activateOp);
    console.log('validation: ', validation)
    if (validation.status !== 0) {
        throw new Error(`error code:${validation.status}`);
    }

    const bundlerEvent = bundler.sendUserOperation(activateOp);
    bundlerEvent.on('error', (err: any) => {
        console.log("error: ", err);
    });
    bundlerEvent.on('send', async (userOpHash: string) => {
        console.log('send: ' + userOpHash);
    });
    bundlerEvent.on('receipt', (receipt: UserOperationReceipt) => {
        console.log('receipt: ' + JSON.stringify(receipt));
    });
    bundlerEvent.on('timeout', () => {
        console.log('timeout');
    });
}

main();
