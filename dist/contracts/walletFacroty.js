"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletFactoryContract = void 0;
const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "wallet",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "logic",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "WalletProxyCreated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "VERSION",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_singleton",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_initializer",
                "type": "bytes"
            },
            {
                "internalType": "bytes32",
                "name": "_salt",
                "type": "bytes32"
            }
        ],
        "name": "createWallet",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_singleton",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_initializer",
                "type": "bytes"
            },
            {
                "internalType": "bytes32",
                "name": "_salt",
                "type": "bytes32"
            }
        ],
        "name": "getWalletAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const bytecode = '6080806040523461001657610d1a908161001c8239f35b600080fdfe60806040526004361015610013575b600080fd5b60003560e01c8063693c86411461004f5780636c7071fb146100465763ffa1ad741461003e57600080fd5b61000e610497565b5061000e61033f565b3461000e5761005d36610292565b9091803b1561016d577f5f7d630d21a144c57b02165ff1d2a8892e2e0b3b4cb14d0b61dec4e5820105ee73ffffffffffffffffffffffffffffffffffffffff846100dd6100b06101259661014f986105f5565b91604051918291876103678085019085821067ffffffffffffffff831117610160575b6106408639610533565b03906000f58015610153575b169283926100f8841515610570565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825233602083015290918291820190565b0390a260405173ffffffffffffffffffffffffffffffffffffffff90911681529081906020820190565b0390f35b61015b610563565b6100e9565b6101686101cb565b6100d3565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f53696e676c65746f6e20636f6e7472616374206e6f74206465706c6f796564006044820152fd5b507f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff82111761023c57604052565b6102446101cb565b604052565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f60209267ffffffffffffffff8111610285575b01160190565b61028d6101cb565b61027f565b9060607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc83011261000e5760043573ffffffffffffffffffffffffffffffffffffffff8116810361000e579160243567ffffffffffffffff811161000e578160238201121561000e5780600401359061030a82610249565b9261031860405194856101fb565b8284526024838301011161000e578160009260246020930183860137830101529060443590565b503461000e5761014f61040a6104006103676103f461035d36610292565b81959294916105f5565b9361036793604051906103a16103cd602094610385868a01866101fb565b888552858501986109a78a396040519283918783019586610533565b037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081018352826101fb565b6040519586936103e5868601998a9251928391610431565b84019151809386840190610431565b010380845201826101fb565b51902030916105d5565b60405173ffffffffffffffffffffffffffffffffffffffff90911681529081906020820190565b60005b8381106104445750506000910152565b8181015183820152602001610434565b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f60209361049081518092818752878088019101610431565b0116010190565b503461000e5760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e5761014f6040516040810181811067ffffffffffffffff821117610526575b604052600581527f302e302e310000000000000000000000000000000000000000000000000000006020820152604051918291602083526020830190610454565b61052e6101cb565b6104e5565b60409073ffffffffffffffffffffffffffffffffffffffff61056094931681528160208201520190610454565b90565b506040513d6000823e3d90fd5b1561057757565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f437265617465322063616c6c206661696c6564000000000000000000000000006044820152fd5b90605592600b92604051926040840152602083015281520160ff81532090565b602081519101209060405190602082019283526040820152604081526060810181811067ffffffffffffffff821117610632575b60405251902090565b61063a6101cb565b61062956fe6040608081523461014f57610367908138038061001b81610154565b938439820191818184031261014f5780516001600160a01b03811680820361014f576020838101516001600160401b039491939185821161014f570186601f8201121561014f578051906100766100718361018f565b610154565b918083528583019886828401011161014f57888661009493016101aa565b600080546001600160a01b0319169093178355855194606086019081118682101761013b578697849283926101249952602788527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c87890152660819985a5b195960ca1b8a8901525190845af4913d15610131573d906101166100718361018f565b91825281943d92013e6101cd565b505160e690816102818239f35b50606092506101cd565b634e487b7160e01b84526041600452602484fd5b600080fd5b6040519190601f01601f191682016001600160401b0381118382101761017957604052565b634e487b7160e01b600052604160045260246000fd5b6001600160401b03811161017957601f01601f191660200190565b60005b8381106101bd5750506000910152565b81810151838201526020016101ad565b9192901561022f57508151156101e1575090565b3b156101ea5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156102425750805190602001fd5b6044604051809262461bcd60e51b82526020600483015261027281518092816024860152602086860191016101aa565b601f01601f19168101030190fdfe608060405260043610156074575b36156047576000808073ffffffffffffffffffffffffffffffffffffffff815416368280378136915af43d82803e156043573d90f35b3d90fd5b34608052337f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460206080a2005b6000803560e01c63b62654fb1460895750600d565b3460d657807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011260d65773ffffffffffffffffffffffffffffffffffffffff90541660805260206080f35b80fdfea164736f6c6343000811000a6040608081523461014f57610367908138038061001b81610154565b938439820191818184031261014f5780516001600160a01b03811680820361014f576020838101516001600160401b039491939185821161014f570186601f8201121561014f578051906100766100718361018f565b610154565b918083528583019886828401011161014f57888661009493016101aa565b600080546001600160a01b0319169093178355855194606086019081118682101761013b578697849283926101249952602788527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c87890152660819985a5b195960ca1b8a8901525190845af4913d15610131573d906101166100718361018f565b91825281943d92013e6101cd565b505160e690816102818239f35b50606092506101cd565b634e487b7160e01b84526041600452602484fd5b600080fd5b6040519190601f01601f191682016001600160401b0381118382101761017957604052565b634e487b7160e01b600052604160045260246000fd5b6001600160401b03811161017957601f01601f191660200190565b60005b8381106101bd5750506000910152565b81810151838201526020016101ad565b9192901561022f57508151156101e1575090565b3b156101ea5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156102425750805190602001fd5b6044604051809262461bcd60e51b82526020600483015261027281518092816024860152602086860191016101aa565b601f01601f19168101030190fdfe608060405260043610156074575b36156047576000808073ffffffffffffffffffffffffffffffffffffffff815416368280378136915af43d82803e156043573d90f35b3d90fd5b34608052337f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460206080a2005b6000803560e01c63b62654fb1460895750600d565b3460d657807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011260d65773ffffffffffffffffffffffffffffffffffffffff90541660805260206080f35b80fdfea164736f6c6343000811000aa164736f6c6343000811000a';
const contract = {
    ABI,
    bytecode
};
exports.WalletFactoryContract = contract;
//# sourceMappingURL=walletFacroty.js.map