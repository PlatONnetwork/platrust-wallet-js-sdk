"use strict";
/*
 * @Description:
 * @Version: 1.0
 * @Autor: z.cejay@gmail.com
 * @Date: 2022-11-04 23:45:24
 * @LastEditors: cejay
 * @LastEditTime: 2023-03-02 19:21:38
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletProxyContract = void 0;
const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_singleton",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Received",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [],
        "name": "singleton",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];
const bytecode = '0x6040608081523461014f57610367908138038061001b81610154565b938439820191818184031261014f5780516001600160a01b03811680820361014f576020838101516001600160401b039491939185821161014f570186601f8201121561014f578051906100766100718361018f565b610154565b918083528583019886828401011161014f57888661009493016101aa565b600080546001600160a01b0319169093178355855194606086019081118682101761013b578697849283926101249952602788527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c87890152660819985a5b195960ca1b8a8901525190845af4913d15610131573d906101166100718361018f565b91825281943d92013e6101cd565b505160e690816102818239f35b50606092506101cd565b634e487b7160e01b84526041600452602484fd5b600080fd5b6040519190601f01601f191682016001600160401b0381118382101761017957604052565b634e487b7160e01b600052604160045260246000fd5b6001600160401b03811161017957601f01601f191660200190565b60005b8381106101bd5750506000910152565b81810151838201526020016101ad565b9192901561022f57508151156101e1575090565b3b156101ea5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156102425750805190602001fd5b6044604051809262461bcd60e51b82526020600483015261027281518092816024860152602086860191016101aa565b601f01601f19168101030190fdfe608060405260043610156074575b36156047576000808073ffffffffffffffffffffffffffffffffffffffff815416368280378136915af43d82803e156043573d90f35b3d90fd5b34608052337f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460206080a2005b6000803560e01c63b62654fb1460895750600d565b3460d657807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011260d65773ffffffffffffffffffffffffffffffffffffffff90541660805260206080f35b80fdfea164736f6c6343000811000a';
const contract = {
    ABI,
    bytecode
};
exports.WalletProxyContract = contract;
//# sourceMappingURL=walletProxy.js.map