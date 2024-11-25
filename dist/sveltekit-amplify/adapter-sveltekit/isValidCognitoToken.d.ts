/**
 * Verifies a Cognito JWT token for its validity.
 *
 * @param input - An object containing:
 *                - token: The JWT token as a string that needs to be verified.
 *                - userPoolId: The ID of the AWS Cognito User Pool to which the token belongs.
 *                - clientId: The Client ID associated with the Cognito User Pool.
 * @internal
 */
export declare const isValidCognitoToken: (input: {
    token: string;
    userPoolId: string;
    clientId: string;
    tokenType: "id" | "access";
}) => Promise<boolean>;
