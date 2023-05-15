import { BonusWalletLib}  from "../wallet";
import { ethers } from "ethers";

async function main() {
    const chainURL = 'https://devnet2openapi.platon.network/rpc'
    const provider = new ethers.providers.JsonRpcProvider(chainURL)
    const wallet = new ethers.Wallet('dd88038a34fedfd9c5ed495898d5a36ceef315f542bd966e72d4e489bc9a344c', provider);

    const paymasterAddr = '0x031e3E8Dcf524710A133d27E02Dc2a04F25eE780';
    const USDTTokenAddr = '0xA31B732A6272E7F1aCdf172f56B2188A777eFd0A';
    const oracle = '0x20402Fc336028F43f278668B71aC2B7Bc1d76bc6';
    const bonusWalletLib = new BonusWalletLib();

    const paymaster = new bonusWalletLib.Paymaster(
        paymasterAddr,  // <address> EntryPoint Contract Address
        wallet
    );
    const entryPoint = await paymaster.entryPoint();
    console.log('entryPoint: ', entryPoint);
    const addToken = await paymaster.addSupportedToken(USDTTokenAddr, oracle);
    console.log('Add token tx: ', addToken);

    const supportedToken = await paymaster.paymasterSupportedToken([USDTTokenAddr]);
    console.log('Supported token: ', supportedToken);

    // const removeToken = await paymaster.removeSupportedToken(USDTTokenAddr);
    // console.log('Remove token tx: ', removeToken);
}

main()
