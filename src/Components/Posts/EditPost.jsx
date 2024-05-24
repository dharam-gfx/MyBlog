import React from 'react'
import { useLoaderData } from 'react-router-dom'
import databaseService from '../../appwrite/Databases';
import { BallTriangle } from 'react-loader-spinner';
import {PostFrom} from '../../pages/index';
import { Query } from 'appwrite';

const EditPost = () => {

    const post = useLoaderData();
    return (

        <div className='p-5 dark:bg-gray-900'>
            <BallTriangle
                height={50}
                width={50}
                radius={5}
                color="gray"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass="dark:bg-gray-900 flex justify-center h-[100vh] items-center"
                visible={!post}
            />

            <PostFrom post={post}></PostFrom>
            
            </div>
    )
}

export default EditPost;

export const EditPostAPI = async ( { params } ) => {
    // console.log(params.postID,"params");
    const data = await databaseService.getPost( params.postID );
      const viewData = await databaseService.getPostViewCount( [Query.equal( 'postID', [data.$id] )] );
      const viewPostCountID= viewData?.documents[0]?.$id ?? null;
      const viewPostCount= viewData?.documents[0]?.viewCount ?? 0;
    return {...data,viewPostCountID:viewPostCountID , viewPostCount:viewPostCount} || {}
}