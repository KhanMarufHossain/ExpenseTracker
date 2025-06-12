import { Account, Client, Databases } from "appwrite";

const client= new Client();

client.setEndpoint("https://fra.cloud.appwrite.io/v1").setProject("684ac7af0013c983eb37");


const account= new Account(client);
const databases= new Databases(client);

export {account, databases};