import { ethers } from "ethers";
import { SignatureMode } from "./utils/signatures";
import { AddressZero } from "./config/constants";
import {
    BonusWalletLib,
    packSignatureHash,
    signMessage,
    encodeSignature,
    recoverAddress,
    UserOperationReceipt
} from './index';

async function main() {
    // 0x2E64cAbc8586CE95B5744DDE91Bc92182CbbD813, 0xa5748918ff73de2e3f6cde786a1567640349eefff2503de82b0bfa4d41d55101
    // const pks = ['0x23eb17bebbc219e9866a7f5303e6c7f59da0fd930e19483e5e54af7ff1a42a43', '0xdaa5375a4b3d05cab2c17e474e1fb084bbd2a837488828d0a5f0a9f1323e25bc', '0x628acd12bc0cb6ecd71a9f9cd5eddfa92f57aa62791d49a779b3865615ad4b6b']
    // let owners = ['0x3136142DEda2340dc2aC12c37F6D584652E056F1', '0x44Af20AB6335CDE46F7D73f88cf6b23CA8D8a286', '0xF609B9a73D1f53fd0Ec93D2b99F0174cfdeDc3Ac']
    const pks = ['0xa5748918ff73de2e3f6cde786a1567640349eefff2503de82b0bfa4d41d55101']
    const owners = ['0x2E64cAbc8586CE95B5744DDE91Bc92182CbbD813']

    const chainURL = 'http://192.168.21.119:8801'
    // const chainURL = 'https://devnet2openapi.platon.network/rpc'
    const bundleURL = 'http://192.168.21.119:9901'

    const bonusWalletLib = new BonusWalletLib();
    const walletLogic = '0x7426C8f418de1EAf202956C8106B375b2B4ad088'
    const walletFactory = '0x607A33F156377BF4C27b799CA1B524F24EacE297' // wallet proxy factory contract address
    const relayerManagerAddr = '0x82c687F650994797c080C5038E2957fa03D38B4C'
    // const walletLogic = '0x3BFEA8b7d16c94bb818b9B704F2FD8c2420d47c8'
    // const walletFactory = '0xbcFB581c7509457b004b4456B98403758B5B7472' // wallet proxy factory contract address
    // const relayerManagerAddr = '0x7859F310A112f24da3cbE157252c8683cD316302'
    // const salt = ethers.utils.formatBytes32String("abc")
    const salt = '0x46a31f1f917570aa8a60b2339f1a0469cbce2feb53c705746446981548845b3b'
    console.log("relayer: ", relayerManagerAddr);

    const initializer = await bonusWalletLib.getSetupCode(
        relayerManagerAddr,   // <address> EntryPoint Contract Address
        owners, // <[address]> owner Address List
        1,       // <number> threshold
        AddressZero,  // <address> to Address
        '0x',  // <string> wallet init execute data
        AddressZero,  // <string> fallbackHandler
        86400,      // <number> lockPerid
    )
    const walletAddress = await bonusWalletLib.calculateWalletAddress(
        walletLogic,  // <address> BonusWalletLogic Contract Address
        initializer,  // <string> initializer
        salt,     // <string> salt (Hex string)
        walletFactory  // <address> wallet Factory Address
    );
    console.log('initializer: ', initializer)
    console.log("wallet: ", walletAddress);
    console.log("factory: ", walletFactory);
    console.log("wallet logic: ", walletLogic);
    const initcode = bonusWalletLib.getInitCode(walletFactory, walletLogic, initializer, salt)
    console.log("init code: ", initcode)
    const activateOp = bonusWalletLib.activateWalletOp(
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
    console.log("user op: ", activateOp.toTuple())
    // const userOpHash = activateOp.getUserOpHash(
    //     "0x32De9126ee5bc74039ADCCe66bc00d13C6651028",  // <address> EntryPoint Contract Address
    //     2206132,                   // <uint32> chainId
    // );
    const userOpHash = await activateOp.getUserOpHashFromContract(
        relayerManagerAddr,  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider( chainURL),  // ethers.providers
    );
    console.log("userOpHash: ", userOpHash);
    const signedHash = packSignatureHash(userOpHash, SignatureMode.owner, 0, 0);

    console.log("signedMsg: ", signedHash);

    const sig = signMessage(signedHash, pks[0])
    console.log('sig: ', sig)
    // let sigs = '0x'
    // for (var i = 0; i < pks.length; i++) {
    //     const sig = signMessage(signedHash, pks[i])
    //     sigs = ethers.utils.solidityPack(
    //         ['bytes', 'bytes'],
    //         [sigs, sig]
    //     )
    // }
    // console.log('sig: ', sigs)
    const pk = recoverAddress(signedHash, sig.substring(0, 132))
    console.log('pk: ', pk)
    activateOp.signature = encodeSignature(SignatureMode.owner, sig, 0, 0);
    console.log("signature: ", activateOp.signature);
    // console.log('activateOp: ', activateOp.toJSON())

    const bundler = new bonusWalletLib.Bundler(
        relayerManagerAddr,  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider(chainURL),
        bundleURL
    );
    // const entryPoints = await bundler.platon_supportedEntryPoints()
    // console.log('entry points: ', entryPoints)
    // // const uor = await bundler.platon_getUserOperationByHash(userOpHash).catch(err=>{
    // //     console.log("error: ", err);
    // // })
    // //
    // // console.log('******', uor)
    //
    const validation = await bundler.simulateHandleOp(activateOp);
    console.log('validation: ', validation)
    if (validation.status !== 0) {
        throw new Error(`error code:${validation.status}`);
    }
    //
    // const bundlerEvent = bundler.sendUserOperation(activateOp);
    // bundlerEvent.on('error', (err: any) => {
    //     console.log("error: ", err);
    // });
    // bundlerEvent.on('send', (userOpHash: string) => {
    //     console.log('send: ' + userOpHash);
    // });
    // bundlerEvent.on('receipt', (receipt: UserOperationReceipt) => {
    //     console.log('receipt: ' + JSON.stringify(receipt));
    // });
    // bundlerEvent.on('timeout', () => {
    //     console.log('timeout');
    // });
}

main();
