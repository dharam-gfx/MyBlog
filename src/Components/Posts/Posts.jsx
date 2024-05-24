import React, { useCallback, useEffect, useState } from 'react'
import databaseService from '../../appwrite/Databases';
import { BallTriangle } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { PostViewCount } from '../../pages/index.js';
const Posts = () => {
    const [posts, setPosts] = useState( [] );
    const [loader, setLoader] = useState( true );
    const navigate = useNavigate()
    useEffect( () => {
        getData()
    }, [] )

    const getData = async ( queries ) => {
        const data = await databaseService.getPosts( queries );
        setPosts( data?.documents ?? [] );
        setLoader( false )
    }
    const textEllipsis = useCallback(
        ( subTitle ) => {
            return subTitle.slice( 0, 120 ) + ( subTitle.length > 120 ? '...' : '' )
        },
        [],
    )
    const postClickHandler = ( id ) => {
        navigate( "/post/" + id )
    }

    return (
        <div>
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
            <section className="text-gray-600 min-h-[calc(100vh-242px)] dark:bg-gray-900 dark:text-white body-font">
                <div className="container px-5 py-10 md:py-15 mx-auto">

                    <div className="flex flex-wrap -m-4">
                        {
                            posts && posts.map( ( post ) => (
                                <div onClick={() => postClickHandler( post.$id )} key={post.$id} className="p-4 md:w-1/3 cursor-pointer transition-all transform hover:scale-105">
                                    <div className="h-full border-2 flex flex-col border-gray-200 hover:border-blue-600 border-opacity-60 rounded-lg overflow-hidden">
                                        <img className="lg:h-48 md:h-36  w-full object-cover object-center" src={databaseService.getFilePreview( post.featuredImageID )} alt="blog" />
                                        <div className="p-6 flex-1 ">
                                            <div className='flex flex-col h-full'>
                                                <div className='flex-1'>
                                                    <h2 className="tracking-widest text-xs dark:text-white title-font font-medium text-gray-400 mb-1 uppercase">{post.categories}</h2>
                                                    <h1 className="title-font text-lg font-medium dark:text-white text-gray-900 mb-3">{post.title}</h1>
                                                    <p className="leading-relaxed mb-3">{textEllipsis( post.subtitle )}</p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center flex-wrap ">
                                                        <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Read More
                                                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M5 12h14"></path>
                                                                <path d="M12 5l7 7-7 7"></path>
                                                            </svg>
                                                        </a>
                                                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                                <circle cx="12" cy="12" r="3"></circle>
                                                            </svg> <PostViewCount postID={post.$id}></PostViewCount>
                                                        </span>
                                                        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                            </svg>0
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            ) )
                        }
                    </div>


                </div>
            </section>
        </div>
    )
}

export default Posts