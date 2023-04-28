import { ethers } from "ethers";
import { SignatureMode } from "./utils/signatures";
import { AddressZero } from "./config/constants";
import { BonusWalletLib, packSignatureHash, signMessage, encodeSignature, recoverAddress } from './index';

async function main() {
    const pks = ['0xa5748918ff73de2e3f6cde786a1567640349eefff2503de82b0bfa4d41d55101']
    let owners = ['0x2E64cAbc8586CE95B5744DDE91Bc92182CbbD813']

    const bonusWalletLib = new BonusWalletLib();
    const walletLogic = '0x2e234DAe75C793f67A35089C9d99245E1C58470b'
    const walletFactory = '0xF62849F9A0B5Bf2913b396098F7c7019b51A820a' // wallet proxy factory contract address
    const relayerManagerAddr = '0x5615dEB798BB3E4dFa0139dFa1b3D433Cc23b72f'
    // const salt = ethers.utils.formatBytes32String("abc")
    const salt = '0x4aa639acfa86f7d60530bf462efdfdd9f4c4a6526226f5284c0af71240d47f25'
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
        50000
    );
    console.log("user op: ", activateOp.toTuple())
    // const userOpHash = activateOp.getUserOpHash(
    //     "0x32De9126ee5bc74039ADCCe66bc00d13C6651028",  // <address> EntryPoint Contract Address
    //     2206132,                   // <uint32> chainId
    // );
    const userOpHash = await activateOp.getUserOpHashFromContract(
        "0x32De9126ee5bc74039ADCCe66bc00d13C6651028",  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider( "https://devnet2openapi.platon.network/rpc"),  // ethers.providers
    );
    console.log("userOpHash: ", userOpHash);
    const signedHash = packSignatureHash("0x18ce4fd4521d9ae133abbd6243d2ee7260a5c106876de58cbf2343564b68a228", SignatureMode.owner, 0, 0);

    console.log("signedMsg: ", signedHash);
    // (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, signedMsg);
    // bytes memory sig = abi.encodePacked(r, s, v);
    // console2.log("sig: ", vm.toString(sig));
    // userOp.signature = Utils.encodeSignature(0, SignatureMode.owner, 0, 0, address(0), sig);
    const sig = signMessage(signedHash, pks[0])
    console.log('sig: ', sig)
    const pk = recoverAddress(signedHash, "0xf5731ae0c243ab09b0c47edb1bffcbc72559274458ccdf6c14abbfb102e0c9800bd6948d378529ec783c0f3c9a99f6a21e1b5b85a5f6931401983bd7b59668091c")
    console.log('pk: ', pk)
    // let sigs = ''
    // for (var i = 0; i < 2; i++) {
    //     const sig = signMessage(signedHash, pks[i])
    //     sigs = ethers.utils.solidityPack(
    //         ['bytes', 'bytes'],
    //         [sigs, sig]
    //     )
    // }
    activateOp.signature = encodeSignature(SignatureMode.owner, sig, 0, 0);
    console.log("signature: ", activateOp.signature);

    // const bundler = new bonusWalletLib.Bundler(
    //     '0x0',  // <address> EntryPoint Contract Address
    //     new ethers.providers.JsonRpcProvider('<RPC Provider>'),
    //     ''
    // );
    //
    // const validation = await bundler.simulateValidation(activateOp);
    // if (validation.status !== 0) {
    //     throw new Error(`error code:${validation.status}`);
    // }
    //
    // const bundlerEvent = bundler.sendUserOperation(activateOp);
    // bundlerEvent.on('error', (err: any) => {
    //     console.log(err);
    // });
    // bundlerEvent.on('send', (userOpHash: string) => {
    //     console.log('send: ' + userOpHash);
    // });
    // bundlerEvent.on('receipt', (receipt: IUserOpReceipt) => {
    //     console.log('receipt: ' + JSON.stringify(receipt));
    // });
    // bundlerEvent.on('timeout', () => {
    //     console.log('timeout');
    // });
}

main();
