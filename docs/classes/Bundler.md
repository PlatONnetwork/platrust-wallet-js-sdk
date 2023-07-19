[bonus-wallet-js-sdk](../README.md) / [Exports](../modules.md) / Bundler

# Class: Bundler

bundler utils

## Table of contents

### Constructors

- [constructor](Bundler.md#constructor)

### Properties

- [\_bundlerApiURL](Bundler.md#_bundlerapiurl)
- [\_chainId](Bundler.md#_chainid)
- [\_entryPoint](Bundler.md#_entrypoint)
- [\_entryPointContract](Bundler.md#_entrypointcontract)
- [\_etherProvider](Bundler.md#_etherprovider)
- [\_init](Bundler.md#_init)
- [\_timeout](Bundler.md#_timeout)
- [\_wallet](Bundler.md#_wallet)

### Methods

- [\_getUserOperationEvent](Bundler.md#_getuseroperationevent)
- [\_simulateValidation](Bundler.md#_simulatevalidation)
- [decodeExecutionResult](Bundler.md#decodeexecutionresult)
- [decodeFailedOp](Bundler.md#decodefailedop)
- [decodeValidationResult](Bundler.md#decodevalidationresult)
- [init](Bundler.md#init)
- [platon\_chainId](Bundler.md#platon_chainid)
- [platon\_estimateUserOperationGas](Bundler.md#platon_estimateuseroperationgas)
- [platon\_getUserOperationByHash](Bundler.md#platon_getuseroperationbyhash)
- [platon\_getUserOperationReceipt](Bundler.md#platon_getuseroperationreceipt)
- [platon\_sendUserOperation](Bundler.md#platon_senduseroperation)
- [platon\_supportedEntryPoints](Bundler.md#platon_supportedentrypoints)
- [rpcRequest](Bundler.md#rpcrequest)
- [sendUserOperation](Bundler.md#senduseroperation)
- [simulateHandleOp](Bundler.md#simulatehandleop)
- [simulateValidation](Bundler.md#simulatevalidation)
- [sleep](Bundler.md#sleep)

## Constructors

### constructor

• **new Bundler**(`entryPoint`, `etherProvider`, `bundlerApiURL`, `timeout?`)

Bundler utils

**`Memberof`**

Bundler

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entryPoint` | `string` | the entry point address |
| `etherProvider` | `BaseProvider` | the ethers.js provider e.g. ethers.provider |
| `bundlerApiURL` | `string` | the bundler api url or the EOA private key |
| `timeout?` | `ApiTimeOut` | the timeout |

#### Defined in

[entities/bundle.ts:45](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L45)

## Properties

### \_bundlerApiURL

• `Private` `Optional` **\_bundlerApiURL**: `string`

#### Defined in

[entities/bundle.ts:29](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L29)

___

### \_chainId

• `Private` **\_chainId**: `number` = `-1`

#### Defined in

[entities/bundle.ts:33](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L33)

___

### \_entryPoint

• `Private` **\_entryPoint**: `string` = `''`

#### Defined in

[entities/bundle.ts:27](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L27)

___

### \_entryPointContract

• `Private` `Optional` **\_entryPointContract**: `Contract`

#### Defined in

[entities/bundle.ts:31](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L31)

___

### \_etherProvider

• `Private` **\_etherProvider**: `BaseProvider`

#### Defined in

[entities/bundle.ts:28](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L28)

___

### \_init

• `Private` **\_init**: `boolean` = `false`

#### Defined in

[entities/bundle.ts:75](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L75)

___

### \_timeout

• `Private` **\_timeout**: `ApiTimeOut`

#### Defined in

[entities/bundle.ts:32](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L32)

___

### \_wallet

• `Private` `Optional` **\_wallet**: `Wallet`

#### Defined in

[entities/bundle.ts:30](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L30)

## Methods

### \_getUserOperationEvent

▸ `Private` **_getUserOperationEvent**(`userOpHash`): `Promise`<`Event`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOpHash` | `string` |

#### Returns

`Promise`<`Event`\>

#### Defined in

[entities/bundle.ts:216](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L216)

___

### \_simulateValidation

▸ `Private` **_simulateValidation**(`op`): `Promise`<[`Result`](../interfaces/Result.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `SerializedUserOperation` |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)\>

#### Defined in

[entities/bundle.ts:440](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L440)

___

### decodeExecutionResult

▸ `Private` **decodeExecutionResult**(`result`): ``null`` \| [`Result`](../interfaces/Result.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `string` |

#### Returns

``null`` \| [`Result`](../interfaces/Result.md)

#### Defined in

[entities/bundle.ts:314](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L314)

___

### decodeFailedOp

▸ `Private` **decodeFailedOp**(`result`): ``null`` \| [`Result`](../interfaces/Result.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `string` |

#### Returns

``null`` \| [`Result`](../interfaces/Result.md)

#### Defined in

[entities/bundle.ts:337](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L337)

___

### decodeValidationResult

▸ `Private` **decodeValidationResult**(`result`): ``null`` \| [`Result`](../interfaces/Result.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `string` |

#### Returns

``null`` \| [`Result`](../interfaces/Result.md)

#### Defined in

[entities/bundle.ts:357](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L357)

___

### init

▸ **init**(): `Promise`<`void`\>

init the bundler

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/bundle.ts:81](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L81)

___

### platon\_chainId

▸ **platon_chainId**(`timeout?`): `Promise`<`string`\>

get bundler supported chainid

**`Memberof`**

Bundler

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeout?` | `number` |

#### Returns

`Promise`<`string`\>

supported chainid

#### Defined in

[entities/bundle.ts:121](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L121)

___

### platon\_estimateUserOperationGas

▸ **platon_estimateUserOperationGas**(`userOp`, `timeout?`): `Promise`<`EstimateUserOpGas`\>

**`Memberof`**

Bundler

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOp` | [`UserOperation`](UserOperation.md) |
| `timeout?` | `number` |

#### Returns

`Promise`<`EstimateUserOpGas`\>

EstimateUserOpGas

#### Defined in

[entities/bundle.ts:188](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L188)

___

### platon\_getUserOperationByHash

▸ **platon_getUserOperationByHash**(`userOpHash`, `timeout?`): `Promise`<``null`` \| [`UserOperationReceipt`](../interfaces/UserOperationReceipt.md)\>

**`Memberof`**

Bundler

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOpHash` | `string` |
| `timeout?` | `number` |

#### Returns

`Promise`<``null`` \| [`UserOperationReceipt`](../interfaces/UserOperationReceipt.md)\>

User operation

#### Defined in

[entities/bundle.ts:255](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L255)

___

### platon\_getUserOperationReceipt

▸ **platon_getUserOperationReceipt**(`userOpHash`, `timeout?`): `Promise`<``null`` \| [`UserOperationReceipt`](../interfaces/UserOperationReceipt.md)\>

**`Memberof`**

Bundler

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOpHash` | `string` |
| `timeout?` | `number` |

#### Returns

`Promise`<``null`` \| [`UserOperationReceipt`](../interfaces/UserOperationReceipt.md)\>

User operation receipt

#### Defined in

[entities/bundle.ts:233](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L233)

___

### platon\_sendUserOperation

▸ **platon_sendUserOperation**(`userOp`, `timeout?`): `Promise`<`string`\>

send user operation via bundler

**`Memberof`**

Bundler

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOp` | [`UserOperation`](UserOperation.md) |
| `timeout?` | `number` |

#### Returns

`Promise`<`string`\>

user operation hash

#### Defined in

[entities/bundle.ts:163](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L163)

___

### platon\_supportedEntryPoints

▸ **platon_supportedEntryPoints**(`timeout?`): `Promise`<`string`[]\>

get bundler supported entry points

**`Memberof`**

Bundler

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeout?` | `number` |

#### Returns

`Promise`<`string`[]\>

supported entry points

#### Defined in

[entities/bundle.ts:142](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L142)

___

### rpcRequest

▸ `Private` **rpcRequest**<`T1`, `T2`\>(`data`, `timeout?`): `Promise`<`T2`\>

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `RPCRequest`<`T1`\> |
| `timeout?` | `number` |

#### Returns

`Promise`<`T2`\>

#### Defined in

[entities/bundle.ts:55](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L55)

___

### sendUserOperation

▸ **sendUserOperation**(`userOp`, `timeout?`, `receiptTimeout?`, `receiptInterval?`): `EventEmitter`

send user operation via bundler

**`Memberof`**

Bundler

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `userOp` | [`UserOperation`](UserOperation.md) | `undefined` |  |
| `timeout?` | `number` | `0` | default 30s |
| `receiptTimeout?` | `number` | `0` |  |
| `receiptInterval?` | `number` | `undefined` | - |

#### Returns

`EventEmitter`

Event emitter

#### Defined in

[entities/bundle.ts:286](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L286)

___

### simulateHandleOp

▸ **simulateHandleOp**(`op`, `target?`, `targetCallData?`): `Promise`<[`Result`](../interfaces/Result.md)\>

simulateHandleOp

**`Memberof`**

Bundler

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `op` | [`UserOperation`](UserOperation.md) | `undefined` |
| `target` | `string` | `AddressZero` |
| `targetCallData` | `string` | `'0x'` |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)\>

result

#### Defined in

[entities/bundle.ts:401](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L401)

___

### simulateValidation

▸ **simulateValidation**(`op`): `Promise`<[`Result`](../interfaces/Result.md)\>

simulateValidation

**`Memberof`**

Bundler

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [`UserOperation`](UserOperation.md) |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)\>

result

#### Defined in

[entities/bundle.ts:436](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L436)

___

### sleep

▸ `Private` **sleep**(`ms`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[entities/bundle.ts:269](https://github.com/study-core/bonus-wallet-js-sdk/blob/a32b79e/src/entities/bundle.ts#L269)
