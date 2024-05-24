import React, { useEffect, useState } from 'react'
import databaseService from '../../appwrite/Databases';
import { Query } from 'appwrite';

const PostViewCount = ({postID}) => {

    const [viewCount , setViewCount] = useState(0)
    useEffect( () => {
        getData([Query.equal( 'postID', [postID] )])
    }, [] )

    const getData = async ( queries ) => {
        const data = await databaseService.getPostViewCount( queries );
        setViewCount( data?.documents[0]?.viewCount ?? 0 );
    }
  return (
    <div>{viewCount}</div>
  )
}

export default PostViewCount