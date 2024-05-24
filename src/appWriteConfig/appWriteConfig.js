
 const appWriteConfig ={
    appWriteURL: String(import.meta.env.VITE_APPWRITE_API_URL),
    appWriteProductID:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseID:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionID:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWritePostViewCountCollectionID:String(import.meta.env.VITE_APPWRITE_POST_VIEW_COUNT_COLLECTION_ID),
    appWriteBucketID:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}

export default appWriteConfig