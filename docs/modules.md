[bonus-wallet-js-sdk](README.md) / Exports

# bonus-wallet-js-sdk

## Table of contents

### Enumerations

- [Operation](enums/Operation.md)
- [SignatureMode](enums/SignatureMode.md)

### Classes

- [BonusWalletLib](classes/BonusWalletLib.md)
- [Bundler](classes/Bundler.md)
- [Paymaster](classes/Paymaster.md)
- [UserOperation](classes/UserOperation.md)

### Interfaces

- [ApproveToken](interfaces/ApproveToken.md)
- [ExecutionResult](interfaces/ExecutionResult.md)
- [FailedOp](interfaces/FailedOp.md)
- [Logs](interfaces/Logs.md)
- [ParsedTransaction](interfaces/ParsedTransaction.md)
- [Result](interfaces/Result.md)
- [ReturnInfo](interfaces/ReturnInfo.md)
- [StakeInfo](interfaces/StakeInfo.md)
- [UserOperationReceipt](interfaces/UserOperationReceipt.md)
- [ValidationResult](interfaces/ValidationResult.md)

### Type Aliases

- [NumberLike](modules.md#numberlike)

### Functions

- [decodeSignature](modules.md#decodesignature)
- [encodeSignature](modules.md#encodesignature)
- [packSignatureHash](modules.md#packsignaturehash)
- [recoverAddress](modules.md#recoveraddress)
- [signMessage](modules.md#signmessage)

## Type Aliases

### NumberLike

Ƭ **NumberLike**: `number` \| `string`

number like type

#### Defined in

[utils/numberLike.ts:7](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/utils/numberLike.ts#L7)

## Functions

### decodeSignature

▸ **decodeSignature**(`packedSignature`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `packedSignature` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `aggregator` | `string` |
| `signature` | `string` |
| `signatureMode` | `BigNumber` |
| `validAfter` | `BigNumber` |
| `validUntil` | `BigNumber` |
| `validationData` | `BigNumber` |

#### Defined in

[utils/signatures.ts:117](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/utils/signatures.ts#L117)

___

### encodeSignature

▸ **encodeSignature**(`signatureMode`, `signature`, `validAfter?`, `validUntil?`, `aggregator?`): `string`

**`Static`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `signatureMode` | [`SignatureMode`](enums/SignatureMode.md) | `undefined` |
| `signature` | `string` | `undefined` |
| `validAfter?` | `number` | `0` |
| `validUntil?` | `number` | `0` |
| `aggregator?` | `string` | `AddressZero` |

#### Returns

`string`

#### Defined in

[utils/signatures.ts:57](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/utils/signatures.ts#L57)

___

### packSignatureHash

▸ **packSignatureHash**(`hash`, `signatureMode?`, `validAfter?`, `validUntil?`, `aggregator?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `hash` | `string` | `undefined` |
| `signatureMode` | [`SignatureMode`](enums/SignatureMode.md) | `SignatureMode.owner` |
| `validAfter?` | `number` | `0` |
| `validUntil?` | `number` | `0` |
| `aggregator?` | `string` | `AddressZero` |

#### Returns

`string`

#### Defined in

[utils/signatures.ts:27](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/utils/signatures.ts#L27)

___

### recoverAddress

▸ **recoverAddress**(`msg`, `signature`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `signature` | `string` |

#### Returns

`string`

#### Defined in

[utils/personalSign.ts:13](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/utils/personalSign.ts#L13)

___

### signMessage

▸ **signMessage**(`msg`, `privateKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `privateKey` | `string` |

#### Returns

`string`

#### Defined in

[utils/personalSign.ts:4](https://github.com/study-core/bonus-wallet-js-sdk/blob/a6cc21a/src/utils/personalSign.ts#L4)
