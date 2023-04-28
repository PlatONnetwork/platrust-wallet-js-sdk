export interface ParsedTransaction {
    blockHash: string;
    blockNumber: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    logs: Logs[];
    logsBloom: string;
    transactionHash: string;
    transactionIndex: string;
    effectiveGasPrice: string;
}
export interface Logs {
    address: string;
    topics: string[];
    data: string;
    blockNumber: string;
    transactionHash: string;
    transactionIndex: string;
    blockHash: string;
    logIndex: string;
    removed: boolean;
}
export interface UserOperationReceipt {
    userOpHash: string;
    sender: string;
    paymaster: string;
    nonce: string;
    actualGasCost: string;
    actualGasUsed: string;
    success: boolean;
    logs: Logs[];
    receipt: ParsedTransaction;
}
