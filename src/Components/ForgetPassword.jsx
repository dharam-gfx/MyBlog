import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import authService from '../appwrite/Auth';
import { toast } from 'react-toastify';
import { Button, InputField } from '../pages/index'
import { useForm } from "react-hook-form"

const ForgetPassword = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isChangePassword, setIsChangePassword] = useState( false )
    const { register, formState: { errors }, handleSubmit, getValues, watch } = useForm();
    const [disabled, setDisabled] = useState( false )              
    useEffect( () => {
        if ( searchParams.get( "userId" ) && searchParams.get( "secret" ) ) {
            setIsChangePassword( true )
        }
    }, [] )
    const updateRecoveryHandler = async ( { password, conformPassword } ) => {
        setDisabled( true );
        console.log( password, conformPassword, searchParams.get( "userId" ), searchParams.get( "secret" ) );
        await authService.updateRecovery( searchParams.get( "userId" ), searchParams.get( "secret" ), password, conformPassword )
            .then( ( res ) => {
                toast.success( "Password changed successfully.", {
                    autoClose: 3000,
                } );
                navigate( "/" );
            } ).catch( ( error ) => {
                setDisabled( false )
                console.log( "Error :: createRecoveryHandler ", error );
            } )
    }
    async function createRecoveryHandler( { email } ) {
        setDisabled( true );

        await authService.createRecovery( email ).then( ( res ) => {
            toast.success( "Please check your email", {
                autoClose: 5000,
            } );
        } ).catch( ( error ) => {
            toast.error( "Email is not correct!" );
            setDisabled( false )
            console.log( "Error :: createRecoveryHandler ", error );
        } )
    }

    return (
        <>
            {
                !isChangePassword ?
                    <div className='h-[calc(100vh-242px)] '>
                        <div className="dark:bg-gray-900 p-5 h-full pt-10">
                            <h1 className='dark:text-white text-3xl mb-5 text-center font-bold'>Password Recovery</h1>
                            <div className='max-w-md mx-auto  p-5 border dark:bg-gray-800 rounded-md'>
                                <form onSubmit={handleSubmit( createRecoveryHandler )} className="">
                                    <InputField error={errors.email?.message} type="email" label="Email" id="email" placeholder="Email"
                                        {
                                        ...register( 'email', {
                                            required: "required",
                                            pattern: {
                                                value: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                                                message: "Ex- test@gmail.com",
                                            }
                                        } )
                                        }
                                    >
                                    </InputField>
                                    <div className="mb-5">
                                        <Button disabled={disabled} type='submit'>Forget</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='h-[calc(100vh-242px)] '>
                        <div className="dark:bg-gray-900 p-5 h-full pt-10">
                            <h1 className='dark:text-white text-3xl mb-5 text-center font-bold'>Enter Password</h1>
                            <div className='max-w-md mx-auto  p-5 border dark:bg-gray-800 rounded-md'>
                                <form onSubmit={handleSubmit( updateRecoveryHandler )} className="">
                                    <InputField error={errors.password?.message}
                                        {
                                        ...register( 'password', {
                                            required: "required",
                                            pattern: {
                                                value: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                                message: "Ex - Test@123",
                                            }
                                        } )
                                        }
                                        type="password" label="Password" id="password" placeholder="Password"></InputField>
                                    <InputField
                                        onPaste={( e ) => {
                                            e.preventDefault()
                                            return false;
                                        }}
                                        error={errors.conformPassword?.message} type="password" label="Conform Password" id="conformPassword" placeholder="Conform Password"
                                        {...register( "conformPassword", {
                                            required: 'confirm password is required',
                                            validate: ( value ) =>
                                                value === getValues( "password" ) || "The passwords do not match",
                                        } )}
                                    >
                                    </InputField>
                                    <div className="mb-5">
                                        <Button disabled={disabled} type='submit'>Change Password</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default ForgetPassword