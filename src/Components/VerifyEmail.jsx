import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import authService from '../appwrite/Auth';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';
import { Button, InputField } from '../pages/index'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux';

const VerifyEmail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificationTitle, setVerificationTitle] = useState( 'Please wait...' )
    const [isEmailVerification, setIsEmailVerification] = useState( false );
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [disabled, setDisabled] = useState( false )
    const authenticated = useSelector( ( state ) => state.AuthReducer.userAuth.status );
    useEffect( () => {
        async function getUser() {
            let userVerily = false;
            await authService.getCurrentUser().then( user => {
                userVerily = user?.emailVerification || false;
            } ).catch( error => {
                console.log( "getCurrentUser", error );
                userVerily = false;
            } )
            return userVerily
        }
        ( async () => {
            let emailVerification = await getUser();
            console.log( "emailVerification", emailVerification, authenticated );
            setIsEmailVerification((searchParams.get( "userId" ) && searchParams.get( "secret" )) );
            if ( searchParams.get( "userId" ) && searchParams.get( "secret" ) && !emailVerification) {
                verifyEmail();
            }
            else if ( !authenticated && !( searchParams.get( "userId" ) && searchParams.get( "secret" ) ) ) {
                navigate( '/' )
            }
            else if ( emailVerification ) {
                navigate( '/' )
            }
        } )()

    }, [] )
    const verifyEmailHandler = async ( { email, password } ) => {
        setDisabled( true )
        console.log( "data", email, password );
        await authService.logout();
        await authService.createVerification( email, password );
        toast.success( "Please check your email", {
            autoClose: 5000,
        } );
    }
    async function verifyEmail() {
        const session = await authService.updateVerification( searchParams.get( "userId" ), searchParams.get( "secret" ) );
        if ( session ) {
            toast.success( "Account Verified Successfully." );
            setVerificationTitle( "Account Verified Successfully." )
            navigate( '/login' )
        }
        else {
            setVerificationTitle( "Email is not verified, Please try after some time.<br/> Thank you" );
            setTimeout( () => {
                navigate( '/signup' );
            }, 5000 );

        }
    }

    return (
        <>
            {
                isEmailVerification ?
                    <div className='h-[calc(100vh-242px)]  grid items-center justify-center dark:bg-gray-900 dark:text-white'>
                        <h1 className='text-center text-lg md:text-4xl bold '>
                            {parse( verificationTitle )}
                        </h1>
                    </div>
                    :
                    <div className='h-[calc(100vh-242px)] '>
                        <div className="dark:bg-gray-900 p-5 h-full pt-10">
                            <h1 className='dark:text-white text-3xl mb-5 text-center font-bold'>Verify Email</h1>

                            <div className='max-w-md mx-auto  p-5 border dark:bg-gray-800 rounded-md'>
                                <form onSubmit={handleSubmit( verifyEmailHandler )} className="">
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

                                    <div className="mb-5">
                                        <Button disabled={disabled} type='submit'>Verify Email</Button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
            }
        </>
    )
}

export default VerifyEmail