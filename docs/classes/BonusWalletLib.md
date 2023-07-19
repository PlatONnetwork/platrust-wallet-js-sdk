[bonus-wallet-js-sdk](../README.md) / [Exports](../modules.md) / BonusWalletLib

# Class: BonusWalletLib

## Table of contents

### Constructors

- [constructor](BonusWalletLib.md#constructor)

### Properties

- [Bundler](BonusWalletLib.md#bundler)
- [Paymaster](BonusWalletLib.md#paymaster)
- [Tokens](BonusWalletLib.md#tokens)
- [\_singletonFactory](BonusWalletLib.md#_singletonfactory)
- [Defines](BonusWalletLib.md#defines)

### Accessors

- [singletonFactory](BonusWalletLib.md#singletonfactory)

### Methods

- [activateWalletOp](BonusWalletLib.md#activatewalletop)
- [addDeposit](BonusWalletLib.md#adddeposit)
- [addOwnerWithThresholdOp](BonusWalletLib.md#addownerwiththresholdop)
- [calculateWalletAddress](BonusWalletLib.md#calculatewalletaddress)
- [calculateWalletAddressByCodeHash](BonusWalletLib.md#calculatewalletaddressbycodehash)
- [changeThresholdOp](BonusWalletLib.md#changethresholdop)
- [clearSessionOp](BonusWalletLib.md#clearsessionop)
- [disableModuleOp](BonusWalletLib.md#disablemoduleop)
- [enableModuleOp](BonusWalletLib.md#enablemoduleop)
- [getDeposit](BonusWalletLib.md#getdeposit)
- [getEntryPoint](BonusWalletLib.md#getentrypoint)
- [getInitCode](BonusWalletLib.md#getinitcode)
- [getLock](BonusWalletLib.md#getlock)
- [getModulesPaginated](BonusWalletLib.md#getmodulespaginated)
- [getNonce](BonusWalletLib.md#getnonce)
- [getOwners](BonusWalletLib.md#getowners)
- [getPackedInitCodeUsingWalletFactory](BonusWalletLib.md#getpackedinitcodeusingwalletfactory)
- [getPaymasterData](BonusWalletLib.md#getpaymasterdata)
- [getSetupCode](BonusWalletLib.md#getsetupcode)
- [getThreshold](BonusWalletLib.md#getthreshold)
- [getWalletCode](BonusWalletLib.md#getwalletcode)
- [isEnabledModule](BonusWalletLib.md#isenabledmodule)
- [isEnabledModules](BonusWalletLib.md#isenabledmodules)
- [isLocked](BonusWalletLib.md#islocked)
- [isOwner](BonusWalletLib.md#isowner)
- [lockWalletOp](BonusWalletLib.md#lockwalletop)
- [number2Bytes32](BonusWalletLib.md#number2bytes32)
- [removeOwnerOp](BonusWalletLib.md#removeownerop)
- [setFallbackHandlerOp](BonusWalletLib.md#setfallbackhandlerop)
- [startSessionOp](BonusWalletLib.md#startsessionop)
- [swapOwnerOp](BonusWalletLib.md#swapownerop)
- [unlockWalletOp](BonusWalletLib.md#unlockwalletop)
- [withdrawDepositOp](BonusWalletLib.md#withdrawdepositop)

## Constructors

### constructor

• **new BonusWalletLib**(`singletonFactory?`)

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `singletonFactory?` | `string` | the singletonFactory address |

#### Defined in

[wallet.ts:37](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L37)

## Properties

### Bundler

• **Bundler**: typeof [`Bundler`](Bundler.md) = `Bundler`

#### Defined in

[wallet.ts:71](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L71)

___

### Paymaster

• **Paymaster**: typeof [`Paymaster`](Paymaster.md) = `Paymaster`

#### Defined in

[wallet.ts:72](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L72)

___

### Tokens

• **Tokens**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ERC1155` | `ERC1155` |
| `ERC20` | `ERC20` |
| `ERC721` | `ERC721` |
| `LAT` | `LAT` |

#### Defined in

[wallet.ts:74](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L74)

___

### \_singletonFactory

• `Private` **\_singletonFactory**: `string`

#### Defined in

[wallet.ts:20](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L20)

___

### Defines

▪ `Static` **Defines**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AddressZero` | `string` |
| `SingletonFactoryAddress` | `string` |
| `bytes32_zero` | `string` |

#### Defined in

[wallet.ts:64](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L64)

## Accessors

### singletonFactory

• `get` **singletonFactory**(): `string`

get singletonFactory address

#### Returns

`string`

address

#### Defined in

[wallet.ts:57](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L57)

## Methods

### activateWalletOp

▸ **activateWalletOp**(`walletLogic`, `initializer`, `paymasterAndData`, `salt`, `walletFactory`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): [`UserOperation`](UserOperation.md)

get the userOperation for active (first time) the wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletLogic` | `string` | the wallet logic contract address |
| `initializer` | `string` | wallet setup code |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `salt` | `string` | the salt number,default is 0 |
| `walletFactory` | `string` | the wallet factory contract address |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

[`UserOperation`](UserOperation.md)

The activate userOperation

#### Defined in

[wallet.ts:202](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L202)

___

### addDeposit

▸ **addDeposit**(`walletAddress`, `signer`, `value`): `Promise`<`any`\>

Deposit more funds for this wallet in the entryPoint

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `signer` | `Wallet` | the ethers.js wallet of call deposit |
| `value` | `string` | add deposit value, unit is lat |

#### Returns

`Promise`<`any`\>

Return deposit transaction receipt

#### Defined in

[wallet.ts:881](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L881)

___

### addOwnerWithThresholdOp

▸ **addOwnerWithThresholdOp**(`walletAddress`, `etherProvider`, `owner`, `threshold`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for adds owner to the wallet and updates the threshold

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `owner` | `string` | add owner address |
| `threshold` | `number` | add threshold |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The addOwnerWithThresholdOp userOperation

#### Defined in

[wallet.ts:315](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L315)

___

### calculateWalletAddress

▸ **calculateWalletAddress**(`walletLogic`, `initializer`, `salt`, `walletFactory`): `string`

calculate wallet address by owner address

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletLogic` | `string` | the wallet logic contract address |
| `initializer` | `string` | wallet setup code |
| `salt` | `string` | the salt number,default is 0 |
| `walletFactory` | `string` | the wallet factory contract address |

#### Returns

`string`

the wallet address

#### Defined in

[wallet.ts:167](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L167)

___

### calculateWalletAddressByCodeHash

▸ `Private` **calculateWalletAddressByCodeHash**(`initCodeHash`, `salt`, `singletonFactory?`): `string`

calculate wallet address

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initCodeHash` | `string` | the init code after keccak256 |
| `salt` | `string` | the salt number |
| `singletonFactory?` | `string` | the singleton factory address |

#### Returns

`string`

the wallet address

#### Defined in

[wallet.ts:985](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L985)

___

### changeThresholdOp

▸ **changeThresholdOp**(`walletAddress`, `etherProvider`, `threshold`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for change the threshold of the wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `threshold` | `number` | new threshold |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The changeThresholdOp userOperation

#### Defined in

[wallet.ts:441](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L441)

___

### clearSessionOp

▸ **clearSessionOp**(`walletAddress`, `etherProvider`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for clear session

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The clearSessionOp userOperation

#### Defined in

[wallet.ts:680](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L680)

___

### disableModuleOp

▸ **disableModuleOp**(`walletAddress`, `etherProvider`, `prevModule`, `module`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for disable the module for the wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `prevModule` | `string` | previous module in the modules linked list |
| `module` | `string` | module to be removed |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The disableModuleOp userOperation

#### Defined in

[wallet.ts:561](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L561)

___

### enableModuleOp

▸ **enableModuleOp**(`walletAddress`, `etherProvider`, `module`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for enable the module for the wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `module` | `string` | module to be whitelisted |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The enableModuleOp userOperation

#### Defined in

[wallet.ts:521](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L521)

___

### getDeposit

▸ **getDeposit**(`walletAddress`, `etherProvider`): `Promise`<`number`\>

get the current wallet deposit in the entrypoint

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`number`\>

Return Amount of deposit

#### Defined in

[wallet.ts:898](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L898)

___

### getEntryPoint

▸ **getEntryPoint**(`walletAddress`, `etherProvider`): `Promise`<`string`\>

get wallet entrypoint address

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`string`\>

wallet entryPoint address

#### Defined in

[wallet.ts:829](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L829)

___

### getInitCode

▸ **getInitCode**(`walletFactory`, `walletLogic`, `initializer`, `salt`): `string`

get wallet init code

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletFactory` | `string` | the wallet factory contract address |
| `walletLogic` | `string` | the wallet logic contract address |
| `initializer` | `string` | initializer data |
| `salt` | `string` |  |

#### Returns

`string`

Init code data

#### Defined in

[wallet.ts:119](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L119)

___

### getLock

▸ **getLock**(`walletAddress`, `etherProvider`): `Promise`<`number`\>

get the release time of a wallet lock

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`number`\>

Return the release time of a wallet lock or 0 if the wallet is unlocked

#### Defined in

[wallet.ts:863](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L863)

___

### getModulesPaginated

▸ **getModulesPaginated**(`start`, `pageSize`, `walletAddress`, `etherProvider`): `Promise`<`any`[]\>

get if an array of modules enabled

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `string` | Start of the page. Has to be a module or start pointer (0x1 address) |
| `pageSize` | `number` | Maximum number of modules that should be returned. Has to be > 0 |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`any`[]\>

Returns an array object with a length of 2, the first element is the modules array, and the second element is the starting point of the next page

@examples:
```
[
  [
    '0x3C4e46647aDBca88D6224fD0b9CD94cfB2F053F3',
    '0x0A531888Fd14243aB544a41fAd8f2C7E3Fd21D94'
    ],
    '0x0000000000000000000000000000000000000001'
]
```

#### Defined in

[wallet.ts:760](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L760)

___

### getNonce

▸ **getNonce**(`walletAddress`, `etherProvider`, `defaultBlock?`): `Promise`<`number`\>

get nonce number from contract wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `walletAddress` | `string` | `undefined` | same as userOperation.sender |
| `etherProvider` | `BaseProvider` | `undefined` | the ethers.js provider e.g. ethers.provider |
| `defaultBlock` | `string` | `'latest'` | "earliest", "latest" and "pending" |

#### Returns

`Promise`<`number`\>

the next nonce number

#### Defined in

[wallet.ts:1005](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L1005)

___

### getOwners

▸ **getOwners**(`walletAddress`, `etherProvider`): `Promise`<`string`[]\>

get a list of wallet owners

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`string`[]\>

Array of wallet owners

#### Defined in

[wallet.ts:794](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L794)

___

### getPackedInitCodeUsingWalletFactory

▸ `Private` **getPackedInitCodeUsingWalletFactory**(`walletFactory`, `walletLogic`, `initializer`, `salt`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `walletFactory` | `string` |
| `walletLogic` | `string` |
| `initializer` | `string` |
| `salt` | `string` |

#### Returns

`string`

#### Defined in

[wallet.ts:908](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L908)

___

### getPaymasterData

▸ **getPaymasterData**(`payMasterAddress`, `token`, `maxCost`): `string`

get paymaster data

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payMasterAddress` | `string` | paymaster contract address |
| `token` | `string` | token address |
| `maxCost` | `BigNumber` | token max cost |

#### Returns

`string`

paymasterAndData(hex string)

#### Defined in

[wallet.ts:931](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L931)

___

### getSetupCode

▸ **getSetupCode**(`entryPoint`, `owners`, `threshold`, `to`, `data`, `fallbackHandler`, `lockPeriod`): `string`

get wallet setup data

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entryPoint` | `string` | the entryPoint address |
| `owners` | `any`[] | 钱包的多个持有者，至少传入一个 |
| `threshold` | `number` | 钱包持有者的多签阈值 |
| `to` | `string` | 钱包的 module 的调用 to 参数， |
| `data` | `string` | 钱包的 module 的调用 calldata 信息， |
| `fallbackHandler` | `string` | 钱包的 fallback 处理合约地址 |
| `lockPeriod` | `number` | 钱包的锁定时长, 单位:(s) |

#### Returns

`string`

setupCode

#### Defined in

[wallet.ts:95](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L95)

___

### getThreshold

▸ **getThreshold**(`walletAddress`, `etherProvider`): `Promise`<`number`\>

get the number of required confirmations for a wallet transaction aka the threshold

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`number`\>

Threshold number

#### Defined in

[wallet.ts:777](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L777)

___

### getWalletCode

▸ **getWalletCode**(`walletLogicAddress`, `walletProxyConfig?`): `string`

get wallet code

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletLogicAddress` | `string` | the wallet logic contract address |
| `walletProxyConfig?` | `Object` | the wallet proxy config |
| `walletProxyConfig.bytecode` | `BytesLike` \| { `object`: `string`  } | - |
| `walletProxyConfig.contractInterface` | `ContractInterface` | - |

#### Returns

`string`

Wallet code

#### Defined in

[wallet.ts:141](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L141)

___

### isEnabledModule

▸ **isEnabledModule**(`module`, `walletAddress`, `etherProvider`): `Promise`<`boolean`\>

get if an module is enabled

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `module` | `string` | module address |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`boolean`\>

True if the module is enabled

#### Defined in

[wallet.ts:712](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L712)

___

### isEnabledModules

▸ **isEnabledModules**(`modules`, `walletAddress`, `etherProvider`): `Promise`<`boolean`\>

get if an array of modules enabled

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modules` | `string`[] | array of moduls |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`boolean`\>

True if an array of modules enabled

#### Defined in

[wallet.ts:730](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L730)

___

### isLocked

▸ **isLocked**(`walletAddress`, `etherProvider`): `Promise`<`boolean`\>

Check if a wallet is locked

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`boolean`\>

Return true if a wallet is locked

#### Defined in

[wallet.ts:846](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L846)

___

### isOwner

▸ **isOwner**(`owner`, `walletAddress`, `etherProvider`): `Promise`<`boolean`\>

get if `owner` is an owner of the wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | query address param is wallet owner |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |

#### Returns

`Promise`<`boolean`\>

if owner is an owner of the wallet

#### Defined in

[wallet.ts:812](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L812)

___

### lockWalletOp

▸ **lockWalletOp**(`walletAddress`, `etherProvider`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for lock the wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The lockWallet userOperation

#### Defined in

[wallet.ts:239](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L239)

___

### number2Bytes32

▸ **number2Bytes32**(`num?`): `string`

convert number to bytes32

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num?` | `number` | the number |

#### Returns

`string`

bytes32

#### Defined in

[wallet.ts:970](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L970)

___

### removeOwnerOp

▸ **removeOwnerOp**(`walletAddress`, `etherProvider`, `prevOwner`, `owner`, `threshold`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for remove the owner from the wallet and update threshold

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `prevOwner` | `string` | owner address that pointed to the owner to be removed in the linked list |
| `owner` | `string` | owner address to be removed |
| `threshold` | `number` | new threshold |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The removeOwnerOp userOperation

#### Defined in

[wallet.ts:357](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L357)

___

### setFallbackHandlerOp

▸ **setFallbackHandlerOp**(`walletAddress`, `etherProvider`, `handler`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for set fallback handler for the wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `handler` | `string` | contract to handle fallback calls |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The setFallbackHandlerOp userOperation

#### Defined in

[wallet.ts:601](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L601)

___

### startSessionOp

▸ **startSessionOp**(`walletAddress`, `etherProvider`, `sessionUser`, `duration`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for start session for user

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `sessionUser` | `string` | use session for the user |
| `duration` | `number` | session duration |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The startSessionOp userOperation

#### Defined in

[wallet.ts:641](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L641)

___

### swapOwnerOp

▸ **swapOwnerOp**(`walletAddress`, `etherProvider`, `prevOwner`, `oldOwner`, `newOwner`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for replace the owner in the wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `prevOwner` | `string` | owner address that pointed to the owner to be removed in the linked list |
| `oldOwner` | `string` | owner address to be replaced |
| `newOwner` | `string` | new owner address |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The swapOwnerOp userOperation

#### Defined in

[wallet.ts:400](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L400)

___

### unlockWalletOp

▸ **unlockWalletOp**(`walletAddress`, `etherProvider`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for unlock the wallet

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The unlockWallet userOperation

#### Defined in

[wallet.ts:276](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L276)

___

### withdrawDepositOp

▸ **withdrawDepositOp**(`walletAddress`, `etherProvider`, `withdrawAddress`, `amount`, `paymasterAndData`, `maxFeePerGas`, `maxPriorityFeePerGas`, `callGasLimit`, `verificationGasLimit`, `preVerificationGas`): `Promise`<[`UserOperation`](UserOperation.md)\>

get the userOperation for withdraw value from wallet's deposit

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletAddress` | `string` | the wallet contract address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `withdrawAddress` | `string` | target address to send to. |
| `amount` | `number` | amount of deposit to withdraw |
| `paymasterAndData` | `undefined` \| `string` | the paymaster address and data |
| `maxFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max fee per gas |
| `maxPriorityFeePerGas` | [`NumberLike`](../modules.md#numberlike) | the max priority fee per gas |
| `callGasLimit` | [`NumberLike`](../modules.md#numberlike) | call gas limit |
| `verificationGasLimit` | [`NumberLike`](../modules.md#numberlike) | verification gas limit |
| `preVerificationGas` | [`NumberLike`](../modules.md#numberlike) | preVerification gas |

#### Returns

`Promise`<[`UserOperation`](UserOperation.md)\>

The withdrawDepositOp userOperation

#### Defined in

[wallet.ts:481](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/wallet.ts#L481)
