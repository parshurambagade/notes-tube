import { Client, Account} from 'appwrite';
import { type Models } from 'appwrite';

export const client: Client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Replace with your project ID

export const account: Account = new Account(client);
export { ID } from 'appwrite';
