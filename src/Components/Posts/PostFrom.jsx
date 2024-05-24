import React, { useState } from 'react'
import { Button, InputField, SelectField, TinyEditor } from '../../pages/index'
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import databaseService from '../../appwrite/Databases';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostFrom = ( { post } ) => {
    const navigate = useNavigate();
    const categories = ["Food", , "Technology", "Travel", "Education", "Health and fitness", "Lifestyle ", "Fashion and beauty", "Photography ", "Personal ", "Music ", "Business ",
        "Art and design", " Book and writing", "Personal finance", "Sports ", "News", "Movie ", "Religion ", "Political "]
    const userID = useSelector( ( state ) => state.AuthReducer.userAuth.userInfo?.$id );
    const [disabled, setDisabled] = useState( false )
    const { register, handleSubmit, formState: { errors }, watch, setValue, control, getValues } = useForm( {
        defaultValues: {
            categories: post?.categories || "",
            title: post?.title || "",
            subtitle: post?.subtitle || "",
            content: post?.content || "",
            status: post?.status || "active",
            userID: post?.$id || "",
            featuredImageID: post?.featuredImageID || "",
        },
    } );
    useEffect( () => {
        if ( post && ( post.userID !== userID ) ) {
            navigate( '/' )
        }
    }, [] )

    const onSubmit = async ( data ) => {
        setDisabled( true )
        if ( !data.userID ) data.userID = userID;
        console.log( data );
        if ( data.featuredImageID[0]?.size > 55000 ) {
            toast.warning( "Please upload image below of 50KB" );
            setDisabled( false )
            return
        }
        if ( post ) {
            const file = data.featuredImageID[0] ? await databaseService.uploadFile( data.featuredImageID[0] ) : null;
            if ( file ) {
                await databaseService.deleteFile( post.featuredImageID );
            }
            data.featuredImageID = file?.$id ? file.$id : data.featuredImageID;
            console.log( "data", data );
            const dbPost = await databaseService.updatedPost( post.$id, { ...data, userID: userID } );

            if ( dbPost ) {
                toast.success( "Post updated SuccessFully" )
                navigate( "/post/" + post.$id );
            } else {
                file && databaseService.deleteFile( file.$id )
            }
        }
        else {

            const file = data.featuredImageID[0] ? await databaseService.uploadFile( data.featuredImageID[0] ) : null;
            console.log( file );
            data.featuredImageID = file.$id;
            const dbPost = await databaseService.createPost( { ...data } );
            console.log("dbPostdbPost",dbPost);
            dbPost && await databaseService.createPostViewCount({postID:dbPost.$id , viewCount: 0})
            if ( dbPost ) {
                toast.success( "Posted SuccessFully" )
                navigate( "/post/" + dbPost.$id );
            } else {
                file && databaseService.deleteFile( file.$id )
            }
        }
    }
    return (
        <div className='dark:bg-gray-900'>
            <form onSubmit={handleSubmit( onSubmit )}>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='flex-1'>
                        <Controller
                            name="title"
                            control={control}
                            render={( { field } ) => <InputField error={errors.title?.message}
                                {
                                ...register( 'title', {
                                    required: "required",
                                    pattern: {
                                        value: /^[A-Za-z]+(([,.] |[ '-])[A-Za-z]+)*([.,'-]?)$/,
                                        message: "Please Enter a Valid Title",
                                    }
                                } )
                                }
                                label="Title" {...field} />}
                        />
                        <Controller
                            name="subtitle"
                            control={control}
                            render={( { field } ) => <InputField error={errors.subtitle?.message}
                                {
                                ...register( 'subtitle', {
                                    required: "required",
                                    pattern: {
                                        value: /^[^\\/&]{15,}$/,
                                        message: "Please Enter a Valid Sub Title",
                                    }
                                } )
                                }
                                label="Sub Title" {...field} />}
                        />
                        <Controller
                            name="categories"
                            control={control}
                            render={( { field } ) => <SelectField options={categories} error={errors.categories?.message}
                                {
                                ...register( 'categories', {
                                    required: "required",
                                    pattern: {
                                        value: /^[^\\/&]{1,15}$/,
                                        message: "Please Select Categories",
                                    }
                                } )
                                }
                                label="Categories :" {...field} />}
                        />
                        {/* <Controller
                            name="featuredImageID"
                            control={control}
                            render={( { field } ) => <InputField error={errors.featuredImageID?.message}
                                type="file"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {
                                ...register( "featuredImageID", {
                                    required: post ? false : 'Upload Image'
                                } )
                                }
                                label="Featured Image :"  {...field} />}
                        /> */}
                        <InputField
                            label="Featured Image :"
                            type="file"
                            className=""
                            error={errors.featuredImageID?.message}
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register( "featuredImageID", { required: post ? false : 'Upload Image' } )}
                        />
                        {post && (
                            <div className="w-full mb-4">
                                <h4 className='dark:text-white mb-3'>Image Preview</h4>
                                <img
                                    src={databaseService.getFilePreview( post.featuredImageID )}
                                    alt=""
                                    className="rounded-lg w-1/3"
                                />
                            </div>
                        )}
                    </div>
                    <div className='flex-1'>
                        <TinyEditor
                            required={true}
                            error={errors.content?.message}
                            label="Content :" name="content" control={control} defaultValue={getValues( "content" )}>
                        </TinyEditor>
                    </div>
                </div>


                <Button disabled={disabled} className='max-w-lg block mx-auto' type='submit'></Button>
            </form>


        </div>
    )
}

export default PostFrom