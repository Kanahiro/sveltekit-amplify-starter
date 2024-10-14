import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
	auth,
	data
});

// allow weak password for testing
const { cfnUserPool } = backend.auth.resources.cfnResources;
cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.RequireSymbols', false);
cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.RequireLowercase', false);
cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.RequireUppercase', false);
cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.RequireNumbers', false);
cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.MinimumLength', 8);
