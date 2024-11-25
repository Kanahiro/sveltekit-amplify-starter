interface CreateTokenValidatorInput {
    userPoolId?: string;
    userPoolClientId?: string;
}
/**
 * Creates a validator object for validating methods in a KeyValueStorage.
 */
export declare const createTokenValidator: ({ userPoolId, userPoolClientId: clientId }: CreateTokenValidatorInput) => {
    getItem: (key: string, value: string) => Promise<boolean>;
};
export {};
