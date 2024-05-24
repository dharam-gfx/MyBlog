import { Client, Account, ID } from "appwrite";
import appWriteConfig from '../appWriteConfig/appWriteConfig';
import { toast } from "react-toastify";

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint( appWriteConfig.appWriteURL )
            .setProject( appWriteConfig.appWriteProductID );
        this.account = new Account( this.client );
    }

    async createAccount( { name, email, password } ) {
        try {
            const res = await this.account.create( ID.unique(), email, password, name );
            this.createVerification( email, password );
            return res

        } catch ( error ) {
            console.log( "Error :: creating account", error );
            toast.error( error.code == 409 ? "Account already exist." : "Try after some time." );
        }
    }

    async createVerification( email, password ) {
        await this.account.createEmailSession( email, password );
        await this.account.createVerification(
            `${window.location.origin}/verify-email`
        );
        await this.account.deleteSessions();

    }

    async updateVerification( userId, secret ) {
        try {
            const res = await this.account.updateVerification(
                userId,
                secret
            )
            return res

        } catch ( error ) {
            console.log( "Error :: updateVerification", error );
        }
    }
    async createRecovery( email ) {
       return await this.account.createRecovery( email, `${window.location.origin}/forget-password` );
    }

    async updateRecovery( userId, secret ,password, conformPassword ) {
        try {
            const res = await this.account.updateRecovery(
                userId,
                secret,
                password,
                conformPassword
            )
            return res

        } catch ( error ) {
            console.log( "Error :: updateRecovery", error );
        }
    }

    async login( { email, password } ) {
        try {
            const session = this.account.createEmailSession( email, password );
            session.then((data)=>{console.log(data)})
            return session
        } catch ( error ) {
            console.log( "Error :: login account", error );
        }
    }

    googleLogin() {
        try {
            this.account.createOAuth2Session(
                "google",
                `${window.location.origin}`,
                `${window.location.origin}/login` );
        } catch ( error ) {
            console.log( "Error :: googleLogin ", error );
        }

    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch ( error ) {
            console.log( "Error :: logout out", error );
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch ( error ) {
            console.log( "Error :: getting current user", error );
        }
        return null;
    }

}

const authService = new AuthService();

export default authService