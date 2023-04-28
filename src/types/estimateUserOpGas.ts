export interface EstimateUserOpGas {
    /**
     * the preVerification gas used by this UserOperation.
     */
    preVerificationGas: string;
    /**
     * gas used for validation of this UserOperation, including account creation
     */
    verificationGas: string;
    /**
     * estimated cost of calling the account with the given callData
     */
    callGasLimit: string;

}
