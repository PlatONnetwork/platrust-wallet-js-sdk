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
- [calculateWalletAddress](BonusWalletLib.md#calculatewalletaddress)
- [calculateWalletAddressByCode](BonusWalletLib.md#calculatewalletaddressbycode)
- [calculateWalletAddressByCodeHash](BonusWalletLib.md#calculatewalletaddressbycodehash)
- [getInitCode](BonusWalletLib.md#getinitcode)
- [getNonce](BonusWalletLib.md#getnonce)
- [getPackedInitCodeUsingWalletFactory](BonusWalletLib.md#getpackedinitcodeusingwalletfactory)
- [getPaymasterData](BonusWalletLib.md#getpaymasterdata)
- [getSetupCode](BonusWalletLib.md#getsetupcode)
- [getWalletCode](BonusWalletLib.md#getwalletcode)
- [lockWalletOp](BonusWalletLib.md#lockwalletop)
- [number2Bytes32](BonusWalletLib.md#number2bytes32)
- [unlockWalletOp](BonusWalletLib.md#unlockwalletop)

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

[wallet.ts:37](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L37)

## Properties

### Bundler

• **Bundler**: typeof [`Bundler`](Bundler.md) = `Bundler`

#### Defined in

[wallet.ts:71](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L71)

___

### Paymaster

• **Paymaster**: typeof [`Paymaster`](Paymaster.md) = `Paymaster`

#### Defined in

[wallet.ts:72](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L72)

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

[wallet.ts:74](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L74)

___

### \_singletonFactory

• `Private` **\_singletonFactory**: `string`

#### Defined in

[wallet.ts:20](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L20)

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

[wallet.ts:64](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L64)

## Accessors

### singletonFactory

• `get` **singletonFactory**(): `string`

get singletonFactory address

#### Returns

`string`

address

#### Defined in

[wallet.ts:57](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L57)

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

[wallet.ts:202](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L202)

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

[wallet.ts:169](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L169)

___

### calculateWalletAddressByCode

▸ **calculateWalletAddressByCode**(`initContract`, `initArgs`, `salt`): `string`

calculate wallet address

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initContract` | `Contract` | the init Contract |
| `initArgs` | `undefined` \| `any`[] | the init args |
| `salt` | `string` | the salt number |

#### Returns

`string`

wallet address

#### Defined in

[wallet.ts:338](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L338)

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

[wallet.ts:370](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L370)

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

[wallet.ts:119](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L119)

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

[wallet.ts:390](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L390)

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

[wallet.ts:300](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L300)

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

[wallet.ts:323](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L323)

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

[wallet.ts:95](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L95)

___

### getWalletCode

▸ **getWalletCode**(`walletLogicAddress`, `initializer`, `walletProxyConfig?`): `string`

get wallet code

**`Memberof`**

BonusWalletLib

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletLogicAddress` | `string` | the wallet logic contract address |
| `initializer` | `string` | initializer data |
| `walletProxyConfig?` | `Object` | the wallet proxy config |
| `walletProxyConfig.bytecode` | `BytesLike` \| { `object`: `string`  } | - |
| `walletProxyConfig.contractInterface` | `ContractInterface` | - |

#### Returns

`string`

Wallet code

#### Defined in

[wallet.ts:142](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L142)

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

[wallet.ts:239](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L239)

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

[wallet.ts:355](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L355)

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

[wallet.ts:276](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/wallet.ts#L276)
