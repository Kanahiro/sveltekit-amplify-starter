import { createAWSCredentialsAndIdentityIdProvider, createKeyValueStorageFromCookieStorageAdapter, createUserPoolsTokenProvider, runWithAmplifyServerContext as runWithAmplifyServerContextCore } from 'aws-amplify/adapter-core';
import { sharedInMemoryStorage, parseAmplifyConfig } from 'aws-amplify/utils';
import { createTokenValidator } from './createTokenValidator.js';
import { createCookieStorage } from './createCookieStorage.js';
function createRunWithAmplifyServerContext(outputs) {
    const resourcesConfig = parseAmplifyConfig(outputs);
    const runWithAmplifyServerContext = async ({ event, operation }) => {
        const keyValueStorage = event
            ? createKeyValueStorageFromCookieStorageAdapter(createCookieStorage(event.cookies), createTokenValidator({
                userPoolId: resourcesConfig.Auth?.Cognito?.userPoolId,
                userPoolClientId: resourcesConfig.Auth?.Cognito?.userPoolClientId
            }))
            : sharedInMemoryStorage;
        const credentialsProvider = createAWSCredentialsAndIdentityIdProvider(resourcesConfig.Auth, keyValueStorage);
        const tokenProvider = createUserPoolsTokenProvider(resourcesConfig.Auth, keyValueStorage);
        return await runWithAmplifyServerContextCore(resourcesConfig, {
            Auth: { credentialsProvider, tokenProvider }
        }, operation);
    };
    return runWithAmplifyServerContext;
}
export { createRunWithAmplifyServerContext };
