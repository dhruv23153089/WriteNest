import conf from "../conf/conf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name);
           if(userAccount){
            // call login function to log the user in after account creation
            return this.login({email, password});
           }
            return userAccount;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite AuthService - getCurrentUser error:", error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSession("current");
        } catch (error) {
            console.log("Appwrite AuthService :: logout error :: error", error);
        } 
    }
}

const authService = new AuthService();
export default authService;