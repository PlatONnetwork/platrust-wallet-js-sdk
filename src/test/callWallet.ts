import { WalletLib }  from "../wallet";
import {
    encodeSignature,
    packSignatureHash,
    SignatureMode,
    signMessage,
    UserOperationReceipt
} from '../index';
import { ethers } from "ethers";

async function main() {
    const pks = ['0xbdbcca45b8af0b751bb39657a005c9ed4341ed7bc15ac6eb37a84b7fd12fcc07', '0xc592fea486116780b0385cb46db070b9806980967cba0e9b7da0528d10aabb6e']
    let owners = ['0xef8ff83e1510DDaD35Db33efa6735F0a9C94ca74', '0x3C4e46647aDBca88D6224fD0b9CD94cfB2F053F3']

    const chainURL = 'https://devnet2openapi2.platon.network/rpc'
    const bundleURL = 'http://10.10.8.183:9901'

    const provider = new ethers.providers.JsonRpcProvider(chainURL)

    const wallet = '0x974E8fC8Ad752F173418C5897E3BCeD1f666A2Fd'
    const relayerManagerAddr = '0x0A531888Fd14243aB544a41fAd8f2C7E3Fd21D94'
    const walletLib = new WalletLib();

    const owns = await walletLib.getOwners(wallet, provider)
    console.log('owns: ', owns)
    const threshold = await walletLib.getThreshold(wallet, provider)
    console.log('threshold: ', threshold.toString())
    const deposit = await walletLib.getDeposit(wallet, provider)
    console.log('deposit: ', deposit.toString())
    const lockTime = await walletLib.getLock(wallet, provider)
    console.log('lockTime: ', lockTime.toString())
    const isLocked = await walletLib.isLocked(wallet, provider)
    console.log('isLocked: ', isLocked)
    const entryPoint = await walletLib.getEntryPoint(wallet, provider)
    console.log('entryPoint: ', entryPoint)
    const isOwner = await walletLib.isOwner('0xe25087902d0e6Ede370d79A2674311B9f23d10fe', wallet, provider)
    console.log('isOwner: ', isOwner)
    const module = '0x3C4e46647aDBca88D6224fD0b9CD94cfB2F053F3'
    const isEnabled = await walletLib.isEnabledModule(module, wallet, provider)
    console.log('isEnabled: ', isEnabled)
    const data = await walletLib.getModulesPaginated('0x0000000000000000000000000000000000000001', 5, wallet, provider)
    console.log('data: ', data, typeof data, data[0], data[1])

    // const clearSessionOp = await walletLib.clearSessionOp(wallet, provider, '0x', 10000000000, 10000000000, 70000, 50000, 60000);
    // console.log('callData: ', clearSessionOp.callData);
    // const startSessionOp = await walletLib.startSessionOp(wallet, provider, '0xef8ff83e1510DDaD35Db33efa6735F0a9C94ca74', 3600000,  '0x', 10000000000, 10000000000, 70000, 50000, 60000);
    // console.log('callData: ', startSessionOp.callData);
    // const enableModuleOp = await walletLib.enableModuleOp(wallet, provider, module,  '0x', 10000000000, 10000000000, 70000, 50000, 60000);
    // console.log('callData: ', enableModuleOp.callData);
    // const userOpHash = await enableModuleOp.getUserOpHashFromContract(
    //     relayerManagerAddr,  // <address> EntryPoint Contract Address
    //     new ethers.providers.JsonRpcProvider( chainURL),  // ethers.providers
    // );
    // const signedHash = packSignatureHash(userOpHash, SignatureMode.owner, 0, 0);
    //
    // console.log("signedMsg: ", signedHash);
    //
    // let sigs = '0x'
    // for (var i = 0; i < pks.length; i++) {
    //     const sig = signMessage(signedHash, pks[i])
    //     sigs = ethers.utils.solidityPack(
    //         ['bytes', 'bytes'],
    //         [sigs, sig]
    //     )
    // }
    // console.log('sig: ', sigs)
    // enableModuleOp.signature = encodeSignature(SignatureMode.owner, sigs, 0, 0);
    // console.log('enableModuleOp signature: ', enableModuleOp.signature);
    //
    // const bundler = new walletLib.Bundler(
    //     relayerManagerAddr,  // <address> EntryPoint Contract Address
    //     provider,
    //     bundleURL
    // );
    //
    // const validation = await bundler.simulateHandleOp(enableModuleOp);
    // console.log('validation: ', validation)
    // if (validation.status !== 0) {
    //     throw new Error(`error code:${validation.status}`);
    // }
    //
    // const bundlerEvent = bundler.sendUserOperation(enableModuleOp);
    // bundlerEvent.on('error', (err: any) => {
    //     console.log("error: ", err);
    // });
    // bundlerEvent.on('send', async (userOpHash: string) => {
    //     console.log('send: ' + userOpHash);
    // });
    // bundlerEvent.on('receipt', (receipt: UserOperationReceipt) => {
    //     console.log('receipt: ' + JSON.stringify(receipt));
    // });
    // bundlerEvent.on('timeout', () => {
    //     console.log('timeout');
    // });
    //
    // const uor = await bundler.platon_getUserOperationByHash(userOpHash).catch(err=>{
    //     console.log("error: ", err);
    // })
    //
    // console.log('******', uor)
}

main()
