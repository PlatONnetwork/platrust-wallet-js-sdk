import { Contract } from '../types/contract';

const ABI: any =
    [
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
    ]
;



const bytecode =
    '608080604052346100165761094c908161001c8239f35b600080fdfe60806040526004361015610013575b600080fd5b6000803560e01c908163693c864114610052575080636c7071fb146100495763ffa1ad741461004157600080fd5b61000e61044b565b5061000e610336565b346101895761009073ffffffffffffffffffffffffffffffffffffffff9161007936610289565b61008a8396939592953b15156104fd565b8461060b565b604051806100d8876101758084019084821067ffffffffffffffff831117610199575b610656853973ffffffffffffffffffffffffffffffffffffffff909116815260200190565b039084f5801561018c575b16916100f083151561056f565b80519081610172575b6040805173ffffffffffffffffffffffffffffffffffffffff8716815233602082015261016e91869182917f5f7d630d21a144c57b02165ff1d2a8892e2e0b3b4cb14d0b61dec4e5820105ee91a260405173ffffffffffffffffffffffffffffffffffffffff90911681529081906020820190565b0390f35b8291602083920182865af1156101895780806100f9565b80fd5b610194610562565b6100e3565b6101a16101a6565b6100b3565b507f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040810190811067ffffffffffffffff8211176101f257604052565b6101fa6101a6565b604052565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff8211176101f257604052565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f60209267ffffffffffffffff811161027c575b01160190565b6102846101a6565b610276565b9060607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc83011261000e5760043573ffffffffffffffffffffffffffffffffffffffff8116810361000e579160243567ffffffffffffffff811161000e578160238201121561000e5780600401359061030182610240565b9261030f60405194856101ff565b8284526024838301011161000e578160009260246020930183860137830101529060443590565b503461000e5761016e61040161035761034e36610289565b9092919261060b565b90610175906103f76040516103cb602093610374858701846101ff565b858352848301956107cb873973ffffffffffffffffffffffffffffffffffffffff6040519116858201528481526103aa816101d6565b6040519485936103c282860198899251928391610428565b840101906105d4565b037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081018352826101ff565b51902030916105eb565b60405173ffffffffffffffffffffffffffffffffffffffff90911681529081906020820190565b60005b83811061043b5750506000910152565b818101518382015260200161042b565b503461000e5760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e576104f46040805161048b816101d6565b600581527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f602083017f302e302e31000000000000000000000000000000000000000000000000000000815284519586946020865251809281602088015287870190610428565b01168101030190f35b1561050457565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f53696e676c65746f6e20636f6e7472616374206e6f74206465706c6f796564006044820152fd5b506040513d6000823e3d90fd5b1561057657565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f437265617465322063616c6c206661696c6564000000000000000000000000006044820152fd5b906105e760209282815194859201610428565b0190565b90605592600b92604051926040840152602083015281520160ff81532090565b602081519101209060405190602082019283526040820152604081526060810181811067ffffffffffffffff821117610648575b60405251902090565b6106506101a6565b61063f56fe60803461007357601f61017538819003918201601f19168301916001600160401b038311848410176100785780849260209460405283398101031261007357516001600160a01b0381169081900361007357600080546001600160a01b03191691909117905560405160e6908161008f8239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe608060405260043610156074575b36156047576000808073ffffffffffffffffffffffffffffffffffffffff815416368280378136915af43d82803e156043573d90f35b3d90fd5b34608052337f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460206080a2005b6000803560e01c63b62654fb1460895750600d565b3460d657807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011260d65773ffffffffffffffffffffffffffffffffffffffff90541660805260206080f35b80fdfea164736f6c6343000811000a60803461007357601f61017538819003918201601f19168301916001600160401b038311848410176100785780849260209460405283398101031261007357516001600160a01b0381169081900361007357600080546001600160a01b03191691909117905560405160e6908161008f8239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe608060405260043610156074575b36156047576000808073ffffffffffffffffffffffffffffffffffffffff815416368280378136915af43d82803e156043573d90f35b3d90fd5b34608052337f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460206080a2005b6000803560e01c63b62654fb1460895750600d565b3460d657807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011260d65773ffffffffffffffffffffffffffffffffffffffff90541660805260206080f35b80fdfea164736f6c6343000811000aa164736f6c6343000811000a'
;


const contract: Contract = {
    ABI,
    bytecode
}

export { contract as WalletFactoryContract };
