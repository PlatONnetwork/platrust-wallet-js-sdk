[bonus-wallet-js-sdk](../README.md) / [Exports](../modules.md) / UserOperation

# Class: UserOperation

**`Description`**

UserOperation class

## Table of contents

### Constructors

- [constructor](UserOperation.md#constructor)

### Properties

- [DefaultGasOverheads](UserOperation.md#defaultgasoverheads)
- [\_callData](UserOperation.md#_calldata)
- [\_callGasLimit](UserOperation.md#_callgaslimit)
- [\_initCode](UserOperation.md#_initcode)
- [\_maxFeePerGas](UserOperation.md#_maxfeepergas)
- [\_maxPriorityFeePerGas](UserOperation.md#_maxpriorityfeepergas)
- [\_nonce](UserOperation.md#_nonce)
- [\_paymasterAndData](UserOperation.md#_paymasteranddata)
- [\_preVerificationGas](UserOperation.md#_preverificationgas)
- [\_sender](UserOperation.md#_sender)
- [\_signature](UserOperation.md#_signature)
- [\_verificationGasLimit](UserOperation.md#_verificationgaslimit)

### Accessors

- [callData](UserOperation.md#calldata)
- [callGasLimit](UserOperation.md#callgaslimit)
- [initCode](UserOperation.md#initcode)
- [maxFeePerGas](UserOperation.md#maxfeepergas)
- [maxPriorityFeePerGas](UserOperation.md#maxpriorityfeepergas)
- [nonce](UserOperation.md#nonce)
- [paymasterAndData](UserOperation.md#paymasteranddata)
- [preVerificationGas](UserOperation.md#preverificationgas)
- [sender](UserOperation.md#sender)
- [signature](UserOperation.md#signature)
- [verificationGasLimit](UserOperation.md#verificationgaslimit)

### Methods

- [Serialized](UserOperation.md#serialized)
- [callDataCost](UserOperation.md#calldatacost)
- [encode](UserOperation.md#encode)
- [getStruct](UserOperation.md#getstruct)
- [getUserOpHash](UserOperation.md#getuserophash)
- [getUserOpHashFromContract](UserOperation.md#getuserophashfromcontract)
- [packUserOp](UserOperation.md#packuserop)
- [payMasterSignHash](UserOperation.md#paymastersignhash)
- [signWithSignature](UserOperation.md#signwithsignature)
- [toJSON](UserOperation.md#tojson)
- [toTuple](UserOperation.md#totuple)
- [fromJSON](UserOperation.md#fromjson)
- [fromObject](UserOperation.md#fromobject)

## Constructors

### constructor

• **new UserOperation**(`sender?`, `nonce?`, `initCode?`, `callData?`, `callGasLimit?`, `maxFeePerGas?`, `maxPriorityFeePerGas?`, `paymasterAndData?`, `verificationGasLimit?`, `preVerificationGas?`, `signature?`)

Creates an instance of UserOperation.

**`Memberof`**

UserOperation

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `sender?` | `string` | `''` |
| `nonce?` | [`NumberLike`](../modules.md#numberlike) | `0` |
| `initCode?` | `string` | `'0x'` |
| `callData?` | `string` | `'0x'` |
| `callGasLimit?` | [`NumberLike`](../modules.md#numberlike) | `0` |
| `maxFeePerGas?` | [`NumberLike`](../modules.md#numberlike) | `0` |
| `maxPriorityFeePerGas?` | [`NumberLike`](../modules.md#numberlike) | `0` |
| `paymasterAndData?` | `string` | `'0x'` |
| `verificationGasLimit?` | [`NumberLike`](../modules.md#numberlike) | `0` |
| `preVerificationGas?` | [`NumberLike`](../modules.md#numberlike) | `0` |
| `signature?` | `string` | `'0x'` |

#### Defined in

[entities/userOperation.ts:41](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L41)

## Properties

### DefaultGasOverheads

• `Private` **DefaultGasOverheads**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bundleSize` | `number` |
| `fixed` | `number` |
| `nonZeroByte` | `number` |
| `perUserOp` | `number` |
| `perUserOpWord` | `number` |
| `sigSize` | `number` |
| `zeroByte` | `number` |

#### Defined in

[entities/userOperation.ts:55](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L55)

___

### \_callData

• `Private` **\_callData**: `string` = `'0x'`

#### Defined in

[entities/userOperation.ts:91](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L91)

___

### \_callGasLimit

• `Private` **\_callGasLimit**: [`NumberLike`](../modules.md#numberlike) = `0`

#### Defined in

[entities/userOperation.ts:98](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L98)

___

### \_initCode

• `Private` **\_initCode**: `string` = `'0x'`

#### Defined in

[entities/userOperation.ts:83](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L83)

___

### \_maxFeePerGas

• `Private` **\_maxFeePerGas**: [`NumberLike`](../modules.md#numberlike) = `0`

#### Defined in

[entities/userOperation.ts:119](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L119)

___

### \_maxPriorityFeePerGas

• `Private` **\_maxPriorityFeePerGas**: [`NumberLike`](../modules.md#numberlike) = `0`

#### Defined in

[entities/userOperation.ts:126](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L126)

___

### \_nonce

• `Private` **\_nonce**: [`NumberLike`](../modules.md#numberlike) = `0`

#### Defined in

[entities/userOperation.ts:76](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L76)

___

### \_paymasterAndData

• `Private` **\_paymasterAndData**: `string` = `'0x'`

#### Defined in

[entities/userOperation.ts:133](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L133)

___

### \_preVerificationGas

• `Private` **\_preVerificationGas**: [`NumberLike`](../modules.md#numberlike) = `0`

#### Defined in

[entities/userOperation.ts:112](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L112)

___

### \_sender

• `Private` **\_sender**: `string` = `''`

#### Defined in

[entities/userOperation.ts:65](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L65)

___

### \_signature

• `Private` **\_signature**: `string` = `'0x'`

#### Defined in

[entities/userOperation.ts:140](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L140)

___

### \_verificationGasLimit

• `Private` **\_verificationGasLimit**: [`NumberLike`](../modules.md#numberlike) = `0`

#### Defined in

[entities/userOperation.ts:105](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L105)

## Accessors

### callData

• `get` **callData**(): `string`

the callData

#### Returns

`string`

#### Defined in

[entities/userOperation.ts:92](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L92)

• `set` **callData**(`value`): `void`

the callData

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:95](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L95)

___

### callGasLimit

• `get` **callGasLimit**(): [`NumberLike`](../modules.md#numberlike)

#### Returns

[`NumberLike`](../modules.md#numberlike)

#### Defined in

[entities/userOperation.ts:99](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L99)

• `set` **callGasLimit**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`NumberLike`](../modules.md#numberlike) |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:102](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L102)

___

### initCode

• `get` **initCode**(): `string`

the initCode

#### Returns

`string`

#### Defined in

[entities/userOperation.ts:84](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L84)

• `set` **initCode**(`value`): `void`

the initCode

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:87](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L87)

___

### maxFeePerGas

• `get` **maxFeePerGas**(): [`NumberLike`](../modules.md#numberlike)

the maxFeePerGas

#### Returns

[`NumberLike`](../modules.md#numberlike)

#### Defined in

[entities/userOperation.ts:120](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L120)

• `set` **maxFeePerGas**(`value`): `void`

the maxFeePerGas

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`NumberLike`](../modules.md#numberlike) |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:123](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L123)

___

### maxPriorityFeePerGas

• `get` **maxPriorityFeePerGas**(): [`NumberLike`](../modules.md#numberlike)

the maxPriorityFeePerGas

#### Returns

[`NumberLike`](../modules.md#numberlike)

#### Defined in

[entities/userOperation.ts:127](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L127)

• `set` **maxPriorityFeePerGas**(`value`): `void`

the maxPriorityFeePerGas

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`NumberLike`](../modules.md#numberlike) |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:130](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L130)

___

### nonce

• `get` **nonce**(): [`NumberLike`](../modules.md#numberlike)

the nonce

#### Returns

[`NumberLike`](../modules.md#numberlike)

#### Defined in

[entities/userOperation.ts:77](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L77)

• `set` **nonce**(`value`): `void`

the nonce

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`NumberLike`](../modules.md#numberlike) |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:80](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L80)

___

### paymasterAndData

• `get` **paymasterAndData**(): `string`

the paymasterAndData

#### Returns

`string`

#### Defined in

[entities/userOperation.ts:134](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L134)

• `set` **paymasterAndData**(`value`): `void`

the paymasterAndData

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:137](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L137)

___

### preVerificationGas

• `get` **preVerificationGas**(): [`NumberLike`](../modules.md#numberlike)

the preVerificationGas

#### Returns

[`NumberLike`](../modules.md#numberlike)

#### Defined in

[entities/userOperation.ts:113](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L113)

• `set` **preVerificationGas**(`value`): `void`

the preVerificationGas

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`NumberLike`](../modules.md#numberlike) |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:116](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L116)

___

### sender

• `get` **sender**(): `string`

the sender address

#### Returns

`string`

#### Defined in

[entities/userOperation.ts:67](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L67)

• `set` **sender**(`value`): `void`

the sender address

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:70](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L70)

___

### signature

• `get` **signature**(): `string`

the signature

#### Returns

`string`

#### Defined in

[entities/userOperation.ts:141](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L141)

• `set` **signature**(`value`): `void`

the signature

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:144](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L144)

___

### verificationGasLimit

• `get` **verificationGasLimit**(): [`NumberLike`](../modules.md#numberlike)

the verificationGasLimit

#### Returns

[`NumberLike`](../modules.md#numberlike)

#### Defined in

[entities/userOperation.ts:106](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L106)

• `set` **verificationGasLimit**(`value`): `void`

the verificationGasLimit

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`NumberLike`](../modules.md#numberlike) |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:109](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L109)

## Methods

### Serialized

▸ **Serialized**(): `void`

**`Description`**

convert NumberLike property to hex string

**`Memberof`**

UserOperation

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:200](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L200)

___

### callDataCost

▸ **callDataCost**(): `number`

#### Returns

`number`

#### Defined in

[entities/userOperation.ts:476](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L476)

___

### encode

▸ `Private` **encode**(`typevalues`, `forSignature`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `typevalues` | { `type`: `string` ; `val`: `any`  }[] |
| `forSignature` | `boolean` |

#### Returns

`string`

#### Defined in

[entities/userOperation.ts:381](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L381)

___

### getStruct

▸ **getStruct**(): `SerializedUserOperation`

**`Description`**

convert to userOperation struct

**`Memberof`**

UserOperation

#### Returns

`SerializedUserOperation`

the userOperation struct

#### Defined in

[entities/userOperation.ts:178](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L178)

___

### getUserOpHash

▸ **getUserOpHash**(`entryPointAddress`, `chainId`): `string`

**`Description`**

get the UserOpHash (userOp hash)

**`Memberof`**

UserOperation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entryPointAddress` | `string` | the entry point address |
| `chainId` | `number` | the chain id |

#### Returns

`string`

the UserOpHash (userOp hash)

#### Defined in

[entities/userOperation.ts:439](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L439)

___

### getUserOpHashFromContract

▸ **getUserOpHashFromContract**(`entryPointAddress`, `etherProvider`, `defaultBlock?`): `Promise`<`string`\>

**`Description`**

get the UserOpHash (userOp hash)

**`Memberof`**

UserOperation

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `entryPointAddress` | `string` | `undefined` | the entry point address |
| `etherProvider` | `BaseProvider` | `undefined` | the ethers.js provider e.g. ethers.provider |
| `defaultBlock` | `string` | `'latest'` | default block |

#### Returns

`Promise`<`string`\>

the UserOpHash (userOp hash)

#### Defined in

[entities/userOperation.ts:456](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L456)

___

### packUserOp

▸ **packUserOp**(`forSignature?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `forSignature` | `boolean` | `true` |

#### Returns

`string`

#### Defined in

[entities/userOperation.ts:387](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L387)

___

### payMasterSignHash

▸ **payMasterSignHash**(): `string`

**`Description`**

get the paymaster sign hash

**`Memberof`**

UserOperation

#### Returns

`string`

the paymaster sign hash

#### Defined in

[entities/userOperation.ts:336](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L336)

___

### signWithSignature

▸ **signWithSignature**(`signature`, `signatureMode?`, `validAfter?`, `validUntil?`): `void`

**`Memberof`**

UserOperation

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `signature` | `string` | `undefined` |
| `signatureMode?` | [`SignatureMode`](../enums/SignatureMode.md) | `SignatureMode.owner` |
| `validAfter?` | `number` | `0` |
| `validUntil?` | `number` | `0` |

#### Returns

`void`

#### Defined in

[entities/userOperation.ts:372](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L372)

___

### toJSON

▸ **toJSON**(): `string`

**`Description`**

convert to userOperation json string

**`Memberof`**

UserOperation

#### Returns

`string`

the userOperation json string

#### Defined in

[entities/userOperation.ts:215](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L215)

___

### toTuple

▸ **toTuple**(): `string`

**`Description`**

convert to userOperation tuple string

**`Memberof`**

UserOperation

#### Returns

`string`

the userOperation tuple string

#### Defined in

[entities/userOperation.ts:155](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L155)

___

### fromJSON

▸ `Static` **fromJSON**(`json`): [`UserOperation`](UserOperation.md)

**`Description`**

convert from userOperation json string

**`Memberof`**

UserOperation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `string` | the userOperation json string |

#### Returns

[`UserOperation`](UserOperation.md)

the userOperation object

#### Defined in

[entities/userOperation.ts:238](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L238)

___

### fromObject

▸ `Static` **fromObject**(`obj`): [`UserOperation`](UserOperation.md)

**`Description`**

convert from userOperation object

**`Memberof`**

UserOperation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | the userOperation object |

#### Returns

[`UserOperation`](UserOperation.md)

the userOperation object

#### Defined in

[entities/userOperation.ts:289](https://github.com/study-core/bonus-wallet-js-sdk/blob/1ac8967/src/entities/userOperation.ts#L289)
