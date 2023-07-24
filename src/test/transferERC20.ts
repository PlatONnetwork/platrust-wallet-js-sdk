import { WalletLib}  from "../wallet";
import {
    encodeSignature,
    packSignatureHash,
    SignatureMode,
    signMessage,
    UserOperationReceipt
} from '../index';
import { ethers } from "ethers";

async function main() {
    const pks = ['0x23eb17bebbc219e9866a7f5303e6c7f59da0fd930e19483e5e54af7ff1a42a43', '0xdaa5375a4b3d05cab2c17e474e1fb084bbd2a837488828d0a5f0a9f1323e25bc', '0x628acd12bc0cb6ecd71a9f9cd5eddfa92f57aa62791d49a779b3865615ad4b6b']
    let owners = ['0x3136142DEda2340dc2aC12c37F6D584652E056F1', '0x44Af20AB6335CDE46F7D73f88cf6b23CA8D8a286', '0xF609B9a73D1f53fd0Ec93D2b99F0174cfdeDc3Ac']

    const chainURL = 'http://192.168.21.119:8801'
    const bundleURL = 'http://192.168.21.119:9901'

    const provider = new ethers.providers.JsonRpcProvider(chainURL)

    const wallet = '0x4F43CfcAE68DfD073dEdd628a0534B8c32c7D6B3';
    const relayerManagerAddr = '0x82c687F650994797c080C5038E2957fa03D38B4C'
    const walletLib = new WalletLib();

    const nonce = await walletLib.getNonce(wallet, provider);
    const USDCTokenAddr = '0x0F1dFcd21699F27E2a6e991E1248d674B6Aa656A';

    const transferLATOp = await walletLib.Tokens.ERC20.transfer(wallet, nonce, '0x', 1000, 10000,  100000, 50000, 60000, USDCTokenAddr, '0xA7429Ae04d8bb89cfD572963adeA8CBf8219609A', '0xde0b6b3a7640000');
    console.log('op: ', transferLATOp.toJSON());
    console.log('callData: ', transferLATOp.callData);
    const userOpHash = await transferLATOp.getUserOpHashFromContract(
        relayerManagerAddr,  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider( chainURL),  // ethers.providers
    );
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
    transferLATOp.signature = encodeSignature(SignatureMode.owner, sigs, 0, 0);
    console.log('lockOp signature: ', transferLATOp.signature);

    const bundler = new walletLib.Bundler(
        relayerManagerAddr,  // <address> EntryPoint Contract Address
        provider,
        bundleURL
    );

    const validation = await bundler.simulateHandleOp(transferLATOp);
    console.log('validation: ', validation)
    if (validation.status !== 0) {
        throw new Error(`error code:${validation.status}`);
    }

    const bundlerEvent = bundler.sendUserOperation(transferLATOp);
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

main()
