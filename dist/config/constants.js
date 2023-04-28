"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletLogic = exports.EntryPointAddress = exports.SingletonFactoryAddress = exports.AddressZero = exports.bytes32_zero = exports.ChainID = void 0;
var ChainID;
(function (ChainID) {
    ChainID[ChainID["MAINNET"] = 210425] = "MAINNET";
    ChainID[ChainID["TESTNET"] = 2206132] = "TESTNET";
})(ChainID = exports.ChainID || (exports.ChainID = {}));
exports.bytes32_zero = '0x0000000000000000000000000000000000000000000000000000000000000000'; // hexZeroPad(hexlify(0), 32)
exports.AddressZero = '0x0000000000000000000000000000000000000000';
exports.SingletonFactoryAddress = '0x19aE7C5A92234C5AF61C9D24404CDF08277de82f';
exports.EntryPointAddress = '0x32De9126ee5bc74039ADCCe66bc00d13C6651028';
exports.WalletLogic = '0xd28E14eEc9132aBE3A99dA120bD6cbd96f871cCC ';
//# sourceMappingURL=constants.js.map