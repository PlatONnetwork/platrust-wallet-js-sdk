[bonus-wallet-js-sdk](../README.md) / [Exports](../modules.md) / Paymaster

# Class: Paymaster

paymaster utils

## Table of contents

### Constructors

- [constructor](Paymaster.md#constructor)

### Properties

- [\_wallet](Paymaster.md#_wallet)
- [contract](Paymaster.md#contract)

### Methods

- [addStake](Paymaster.md#addstake)
- [addSupportedToken](Paymaster.md#addsupportedtoken)
- [deposit](Paymaster.md#deposit)
- [entryPoint](Paymaster.md#entrypoint)
- [getDeposit](Paymaster.md#getdeposit)
- [getExchangePrice](Paymaster.md#getexchangeprice)
- [paymasterSupportedToken](Paymaster.md#paymastersupportedtoken)
- [removeSupportedToken](Paymaster.md#removesupportedtoken)
- [unlockStake](Paymaster.md#unlockstake)
- [withdrawStake](Paymaster.md#withdrawstake)
- [withdrawTo](Paymaster.md#withdrawto)
- [withdrawToken](Paymaster.md#withdrawtoken)

## Constructors

### constructor

• **new Paymaster**(`payMasterAddress`, `wallet`)

Bundler utils

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payMasterAddress` | `string` | paymaster contract address |
| `wallet` | `Wallet` | the ethers.js wallet (paymaster owner) |

#### Defined in

[entities/paymaster.ts:22](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L22)

## Properties

### \_wallet

• `Private` **\_wallet**: `Wallet`

#### Defined in

[entities/paymaster.ts:11](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L11)

___

### contract

• `Private` **contract**: `Contract`

#### Defined in

[entities/paymaster.ts:10](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L10)

## Methods

### addStake

▸ **addStake**(`extraUnstakeDelaySec`, `value`): `Promise`<`any`\>

Add stake by paymaster

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extraUnstakeDelaySec` | `number` | Unstake Delay Second |
| `value` | `string` | stake amount, unit is lat |

#### Returns

`Promise`<`any`\>

transaction receipt

#### Defined in

[entities/paymaster.ts:86](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L86)

___

### addSupportedToken

▸ **addSupportedToken**(`token`, `priceOracle`): `Promise`<`any`\>

Add supported token by paymaster

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | token address |
| `priceOracle` | `string` | price oracle address |

#### Returns

`Promise`<`any`\>

transaction receipt

#### Defined in

[entities/paymaster.ts:65](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L65)

___

### deposit

▸ **deposit**(`value`): `Promise`<`any`\>

Deposit by paymaster

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | deposit amount, unit is lat |

#### Returns

`Promise`<`any`\>

transaction receipt

#### Defined in

[entities/paymaster.ts:138](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L138)

___

### entryPoint

▸ **entryPoint**(): `Promise`<`any`\>

get entrypoint address  by paymaster

**`Memberof`**

Paymaster

#### Returns

`Promise`<`any`\>

entrypoint address

#### Defined in

[entities/paymaster.ts:53](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L53)

___

### getDeposit

▸ **getDeposit**(): `Promise`<`any`\>

Get deposit by paymaster

**`Memberof`**

Paymaster

#### Returns

`Promise`<`any`\>

deposit amount

#### Defined in

[entities/paymaster.ts:147](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L147)

___

### getExchangePrice

▸ **getExchangePrice**(`token`, `fetchTokenDecimals?`): `Promise`<{ `decimals`: `number` ; `price`: `BigNumber` ; `tokenDecimals`: `undefined` \| `number`  }\>

get paymaster exchange price

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `token` | `string` | `undefined` | token address |
| `fetchTokenDecimals` | `boolean` | `false` | fetch token decimals or not |

#### Returns

`Promise`<{ `decimals`: `number` ; `price`: `BigNumber` ; `tokenDecimals`: `undefined` \| `number`  }\>

exchange price

#### Defined in

[entities/paymaster.ts:158](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L158)

___

### paymasterSupportedToken

▸ **paymasterSupportedToken**(`tokens`): `Promise`<`string`[]\>

Check if the token is supported by paymaster

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokens` | `string`[] | token address list |

#### Returns

`Promise`<`string`[]\>

supported token address list

#### Defined in

[entities/paymaster.ts:33](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L33)

___

### removeSupportedToken

▸ **removeSupportedToken**(`token`): `Promise`<`any`\>

Remove supported token by paymaster

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | token address |

#### Returns

`Promise`<`any`\>

transaction receipt

#### Defined in

[entities/paymaster.ts:75](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L75)

___

### unlockStake

▸ **unlockStake**(): `Promise`<`any`\>

unlock stake by paymaster

**`Memberof`**

Paymaster

#### Returns

`Promise`<`any`\>

transaction receipt

#### Defined in

[entities/paymaster.ts:95](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L95)

___

### withdrawStake

▸ **withdrawStake**(`withdrawAddress`): `Promise`<`any`\>

Withdraw stake to special address by paymaster

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `withdrawAddress` | `string` | withdraw to address |

#### Returns

`Promise`<`any`\>

transaction receipt

#### Defined in

[entities/paymaster.ts:105](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L105)

___

### withdrawTo

▸ **withdrawTo**(`withdrawAddress`, `amount`): `Promise`<`any`\>

Withdraw special amount stake to special address by paymaster

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `withdrawAddress` | `string` | withdraw to address |
| `amount` | `string` | withdraw amount, unit is lat |

#### Returns

`Promise`<`any`\>

transaction receipt

#### Defined in

[entities/paymaster.ts:128](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L128)

___

### withdrawToken

▸ **withdrawToken**(`token`, `to`, `amount`): `Promise`<`any`\>

Add stake by paymaster

**`Memberof`**

Paymaster

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | token address |
| `to` | `string` | withdraw to address |
| `amount` | `string` | withdraw token amount, unit is lat |

#### Returns

`Promise`<`any`\>

transaction receipt

#### Defined in

[entities/paymaster.ts:117](https://github.com/study-core/bonus-wallet-js-sdk/blob/55d69f8/src/entities/paymaster.ts#L117)
