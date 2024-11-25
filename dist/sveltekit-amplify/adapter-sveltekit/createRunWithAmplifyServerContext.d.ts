import type { RequestEvent } from '@sveltejs/kit';
import { type AmplifyOutputs, type AmplifyServer } from 'aws-amplify/adapter-core';
type RunWithAmplifyServerContextOptions = {
    event: RequestEvent | null;
    operation: (contextSpec: AmplifyServer.ContextSpec) => boolean | Promise<boolean>;
};
declare function createRunWithAmplifyServerContext(outputs: AmplifyOutputs): ({ event, operation }: RunWithAmplifyServerContextOptions) => Promise<boolean>;
export { createRunWithAmplifyServerContext };
