/**
 * RPC Request
 *
 * @export
 * @interface RPCRequest
 * @template T
 */
export interface RPCRequest<T> {
    jsonrpc: string;
    id: number;
    method: string;
    params: T;
}
export interface RPCError {
    code: number;
    message: string;
}
export interface RPCResponse<T> {
    jsonrpc: string;
    id: number;
    result: T;
    error: RPCError;
}
