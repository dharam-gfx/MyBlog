import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import databaseService from '../../appwrite/Databases';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';
const Post = () => {
    const navigate = useNavigate();
    const post = useLoaderData( {} );
    const authenticated = useSelector( ( state ) => state.AuthReducer.userAuth.status );
    const userID = useSelector( ( state ) => state.AuthReducer.userAuth.userInfo?.$id );
    const [loader, setLoader] = useState( true );
    useEffect( () => {
        window.scrollTo( { top: 0, behavior: 'smooth' } );
        post && setLoader( false );
        updatePostViewCountHandler()

    }, [post] );
    const updatePostViewCountHandler = async () => {
        if ( post?.viewPostCountID ) {
            await databaseService.updatedPostViewCount( post?.viewPostCountID, { viewCount: post?.viewPostCount } );
        }
    }
    return (
        <div className="text-gray-600 dark:bg-gray-900 dark:text-white body-font">
            <BallTriangle
                height={50}
                width={50}
                radius={5}
                color="blue"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass="dark:bg-gray-900 flex justify-center h-[100vh] items-center"
                visible={loader}
            />
            <article className="px-4 py-10 mx-auto max-w-8xl">

                <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-1/2">


                    <img src={databaseService.getFilePreview( post.featuredImageID )} className="object-cover w-full h-64 bg-center rounded-lg" alt="Kutty" />
                    <p className="mt-6 mb-2 text-xs font-semibold tracking-wider uppercase text-primary">{post.categories}</p>
                    <h1 className="mb-3 text-3xl font-bold leading-tight dark:text-white md:text-4xl" >
                        {post.title}
                    </h1>
                    <div className="flex mb-6 space-x-2">
                        <p>{post.subtitle}</p>
                    </div>

                </div>

                <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2 ">
                    <div className='browser-css'>
                        {parse( post.content )}
                    </div>
                </div>
                <div className='text-left py-4 w-full mx-auto prose md:w-3/4 lg:w-1/2 '>
                    {/* <h1>{post.userID} {userID}</h1> */}
                    <div className='flex justify-between'>

                        <button onClick={() => navigate( "/" )} title='Go to back' className='bg-fuchsia-600 h-8 hover:bg-fuchsia-700 transition-colors px-5 rounded-md text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </button>

                        <div>
                            {
                                ( userID === post.userID ) && authenticated ?
                                    <div className='text-right pb-4'>
                                        <button onClick={() => navigate( "/edit-post/" + post.$id )} title='Edit Post' className='bg-green-600 h-8 hover:bg-green-700 transition-colors px-5 rounded-md text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>

                                        </button>
                                        <button onClick={async () => {

                                            const isDeleted = await databaseService.deletePost( post.$id, post.featuredImageID );
                                            if ( isDeleted ) {
                                                post?.viewPostCountID && await databaseService.deletePostViewCount( post?.viewPostCountID )
                                                toast.success( "Post Deleted" )
                                                navigate( "/" )
                                            }

                                        }} title='Delete Post' className='bg-red-600 hover:bg-red-700 h-8 transition-colors px-5 rounded-md ml-4 text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                    : null

                            }
                        </div>
                    </div>
                </div>
            </article>

        </div>
    )
}

export default Post