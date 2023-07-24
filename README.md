<h1 align="center">
   <b>
        platrust-wallet-js-sdk
    </b>
</h1>

<p align="center">The interaction library for platrust Wallet</p>

<p align="center">
    <a href="https://github.com/PlatONnetwork/platrust-wallet-contracts/"><b>Compatible Contracts</b></a> •
    <a href="docs/modules.md"><b>Documentation</b></a>
</p>


## Table of Contents

  - [Features](#features)

  - [Installing](#installing)
    
  - [Example](#example)

  - [License](#license)

    

## Features

- All-In-One

- UserOperation can be built with a single function

- Built-in Bundler module

- Built-in common operations, such as ERC20 ERC721 ERC1155 (e.g. you can create a transfer UserOperation with one function)

- Auto update preVerificationGas (lower deposit requirements for user)

- ⚠️ Note: current version will refactor the code in the future and cannot guarantee compatibility

  

## Installing

Using npm:

```bash
$ npm install git+https://github.com/PlatONnetwork/platrust-wallet-js-sdk.git#v0.1.0
```

Using yarn:

```bash
$ yarn add git+https://github.com/PlatONnetwork/platrust-wallet-js-sdk.git#v0.1.0
```

Using pnpm:

```bash
$ pnpm add git+https://github.com/PlatONnetwork/platrust-wallet-js-sdk.git#v0.1.0
```

Once the package is installed, you can import the library using `import` approach:

```bash
import { ApproveToken, ParsedTransaction, walletLib, UserOperation } from 'platrust-wallet-js-sdk';
```



## Example

```typescript
import { ethers } from "ethers";
import { Accounts } from "web3-eth-accounts";
import { UserOpReceipt, walletLib, UserOperation, packSignatureHash, signMessage, encodeSignature } from 'platrust-wallet-js-sdk';

async function main() {
    const pks = ['0xa5748918ff73de2e3f6cde786a1567640349eefff2503de82b0bfa4d41d55101']
    let owners = ['0x2E64cAbc8586CE95B5744DDE91Bc92182CbbD813']

    const walletLib = new walletLib();
    const walletLogic = '0x2e234DAe75C793f67A35089C9d99245E1C58470b'
    const walletFactory = '0xF62849F9A0B5Bf2913b396098F7c7019b51A820a' // wallet proxy factory contract address
    const relayerManagerAddr = '0x5615dEB798BB3E4dFa0139dFa1b3D433Cc23b72f'
    // const salt = ethers.utils.formatBytes32String("abc")
    const salt = '0x4aa639acfa86f7d60530bf462efdfdd9f4c4a6526226f5284c0af71240d47f25'
    console.log("relayer: ", relayerManagerAddr);

    const initializer = await walletLib.getSetupCode(
        relayerManagerAddr,   // <address> EntryPoint Contract Address
        owners, // <[address]> owner Address List
        1,       // <number> threshold
        AddressZero,  // <address> to Address
        '0x',  // <string> wallet init execute data
        AddressZero,  // <string> fallbackHandler
        86400,      // <number> lockPerid
    )
    const walletAddress = await walletLib.calculateWalletAddress(
        walletLogic,  // <address> walletLogic Contract Address
        initializer,  // <string> initializer
        salt,     // <string> salt (Hex string)
        walletFactory  // <address> wallet Factory Address
    );
    console.log('initializer: ', initializer)
    // console.log("wallet: ", walletAddress);
    // console.log("factory: ", walletFactory);
    // console.log("wallet logic: ", walletLogic);
    const initcode = walletLib.getInitCode(walletFactory, walletLogic, initializer, salt)
    console.log("init code: ", initcode)
    const activateOp = walletLib.activateWalletOp(
        walletLogic,  // <address> wallet Logic Contract Address
        initializer,  // <string> initializer
        undefined,   // <bytes> paymasterAndData
        salt,     // <string> salt (Hex string)
        walletFactory,  // <address> Wallet factory Contract Address
        100,      // <number> maxFeePerGas 100Gwei
        1000,     // <number> maxPriorityFeePerGas 10Gwei
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
        relayerManagerAddr,  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider( "https://devnet2openapi.platon.network/rpc"),  // ethers.providers
    );
    console.log("userOpHash: ", userOpHash);
    
    const signedHash = packSignatureHash(userOpHash, SignatureMode.owner, 0, 0);

    console.log("signedMsg: ", signedHash);
    const sig = signMessage(signedHash, pks[0])
    console.log('sig: ', sig)
    const pk = recoverAddress(signedHash, sig)
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
    
    const bundler = new BaseWalletLib.Bundler(
        '0x0',  // <address> EntryPoint Contract Address
        new ethers.providers.JsonRpcProvider( "https://devnet2openapi.platon.network/rpc"),  // ethers.providers
    );

    const validation = await bundler.simulateValidation(activateOp);
    if (validation.status !== 0) {
        throw new Error(`error code:${validation.status}`);
    }

    const bundlerEvent = bundler.sendUserOperation(activateOp);
    bundlerEvent.on('error', (err: any) => {
        console.log(err);
    });
    bundlerEvent.on('send', (userOpHash: string) => {
        console.log('send: ' + userOpHash);
    });
    bundlerEvent.on('receipt', (receipt: IUserOpReceipt) => {
        console.log('receipt: ' + JSON.stringify(receipt));
    });
    bundlerEvent.on('timeout', () => {
        console.log('timeout');
    });
}

main();
```

## License

[MPL-2.0](LICENSE)
