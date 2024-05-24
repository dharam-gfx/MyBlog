import { Client, Databases, ID, Query, Storage } from "appwrite";
import appWriteConfig from '../appWriteConfig/appWriteConfig';

class DatabaseService {

    client = new Client();
    databases;
    storage;

    constructor() {
        this.client.setEndpoint( appWriteConfig.appWriteURL )
            .setProject( appWriteConfig.appWriteProductID )
        this.databases = new Databases( this.client );
        this.storage = new Storage( this.client );
    }

    async createPost( { categories, title, subtitle, content, status, userID, featuredImageID } ) {
        try {
            return await this.databases.createDocument(
                appWriteConfig.appWriteDatabaseID,
                appWriteConfig.appWriteCollectionID,
                ID.unique(),
                {
                    categories,
                    title,
                    subtitle,
                    content,
                    status,
                    userID,
                    featuredImageID
                }
            )

        } catch ( error ) {
            console.log( "Error :: creating post", error );

        }
    }
    async createPostViewCount( { postID, viewCount = 0 } ) {
        try {
            return await this.databases.createDocument(
                appWriteConfig.appWriteDatabaseID,
                appWriteConfig.appWritePostViewCountCollectionID,
                ID.unique(),
                {
                    postID,
                    viewCount
                }
            )

        } catch ( error ) {
            console.log( "Error :: creating PostViewCount", error );

        }
    }
    async getPostViewCount( queries = [] ) {
        try {
            return await this.databases.listDocuments(
                appWriteConfig.appWriteDatabaseID,
                appWriteConfig.appWritePostViewCountCollectionID,
                queries
            );

        } catch ( error ) {
            console.log( "Error :: get PostViewCount", error );
        }
    }
       async updatedPostViewCount( documentID, { viewCount } ) {
            const count = viewCount + 1;
        try {
            return await this.databases.updateDocument(
                appWriteConfig.appWriteDatabaseID,
                appWriteConfig.appWritePostViewCountCollectionID,
                documentID,
                {
                    viewCount:count
                } );

        } catch ( error ) {
            console.log( "Error :: update PostViewCount", error );
        }
    }
    async deletePostViewCount( documentID ) {
        try {
            await this.databases.deleteDocument(
                appWriteConfig.appWriteDatabaseID,
                appWriteConfig.appWritePostViewCountCollectionID,
                documentID );
            
        } catch ( error ) {
            log( "Error :: delete PostViewCount", error );
            return false;
        }
    }
    async getPost( documentID ) {
        try {
            return await this.databases.getDocument(
                appWriteConfig.appWriteDatabaseID,
                appWriteConfig.appWriteCollectionID,
                documentID );

        } catch ( error ) {
            console.log( "Error :: get post", error );
        }
    }
    async getPosts( queries = [Query.equal( 'status', ["active"] )] ) {
        try {
            return await this.databases.listDocuments(
                appWriteConfig.appWriteDatabaseID,
                appWriteConfig.appWriteCollectionID,
                queries
            );

        } catch ( error ) {
            console.log( "Error :: get posts", error );
        }
    }
    async deletePost( documentID, featuredImageID ) {
        try {
            await this.databases.deleteDocument(
                appWriteConfig.appWriteDatabaseID,
                appWriteConfig.appWriteCollectionID,
                documentID );
            return this.deleteFile( featuredImageID );
        } catch ( error ) {
            log( "Error :: delete post", error );
            return false;
        }
    }
    async updatedPost( documentID, { categories, title, subtitle, content, status, userID, featuredImageID } ) {
        try {
            return await this.databases.updateDocument(
                appWriteConfig.appWriteDatabaseID,
                appWriteConfig.appWriteCollectionID,
                documentID,
                {
                    categories,
                    title,
                    subtitle,
                    content,
                    status,
                    userID,
                    featuredImageID
                } );

        } catch ( error ) {
            console.log( "Error :: update post", error );
        }
    }

    //* file upload delete preview services

    async uploadFile( file ) {
        try {
            return await this.storage.createFile(
                appWriteConfig.appWriteBucketID,
                ID.unique(),
                file
            )
        } catch ( error ) {
            console.log( "Error :: uploading file", error );
        }
    }

    async deleteFile( fileID ) {
        try {
            await this.storage.deleteFile(
                appWriteConfig.appWriteBucketID,
                fileID
            )
            return true;
        } catch ( error ) {
            console.log( "Error :: deleting file", error );
            return false;
        }
    }
    // async updateFile( fileID, file ) {
    //     try {
    //         return await this.storage.updateFile(
    //             appWriteConfig.appWriteBucketID,
    //             fileID,
    //             file
    //         )
    //     } catch ( error ) {
    //         console.log( "Error :: deleting file", error );
    //     }
    // }
    getFilePreview( fileID ) {
        return this.storage.getFilePreview(
            appWriteConfig.appWriteBucketID,
            fileID );
    }

    getFileView( fileID ) {
        return this.storage.getFileView(
            appWriteConfig.appWriteBucketID,
            fileID
        )
    }

}


const databaseService = new DatabaseService;

export default databaseService
