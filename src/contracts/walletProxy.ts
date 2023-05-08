/*
 * @Description:
 * @Version: 1.0
 * @Autor: z.cejay@gmail.com
 * @Date: 2022-11-04 23:45:24
 * @LastEditors: cejay
 * @LastEditTime: 2023-03-02 19:21:38
 */

import { Contract } from '../types/contract';

const ABI: any =
    [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_singleton",
                    "type": "address"
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
    ]
;



const bytecode =
    '60803461007357601f61017538819003918201601f19168301916001600160401b038311848410176100785780849260209460405283398101031261007357516001600160a01b0381169081900361007357600080546001600160a01b03191691909117905560405160e6908161008f8239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe608060405260043610156074575b36156047576000808073ffffffffffffffffffffffffffffffffffffffff815416368280378136915af43d82803e156043573d90f35b3d90fd5b34608052337f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460206080a2005b6000803560e01c63b62654fb1460895750600d565b3460d657807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011260d65773ffffffffffffffffffffffffffffffffffffffff90541660805260206080f35b80fdfea164736f6c6343000811000a'
;


const contract: Contract = {
    ABI,
    bytecode
}

export { contract as WalletProxyContract };
