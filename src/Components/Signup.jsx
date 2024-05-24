import React, { useEffect, useState } from 'react'
import { Button, InputField } from '../pages/index'
import { useSelector } from 'react-redux';
import authService from '../appwrite/Auth'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
const Signup = () => {
    const navigate = useNavigate();
    const authenticated = useSelector( ( state ) => state.AuthReducer.userAuth.status );
    const [disabled, setDisabled] = useState( false )
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect( () => {
        authenticated && navigate( '/' );
    }, [authenticated] );

    const loginHandler = async ( { name, email, password } ) => {
        setDisabled( true )
        try {
            const res = await authService.createAccount( { name, email, password } );
            if ( res ) {
                toast.success( "Please check your email", {
                    autoClose: 5000,
                } );
            }

        } catch ( error ) {
            setDisabled( false )
            console.log( "Error from loginHandler", error.message );
            toast.warning( "Please check the email and password." );
        }


    }
    return (
        <div className="dark:bg-gray-900 p-5 h-[calc(100svh-175px)]">
            <h1 className='dark:text-white text-3xl mb-5 text-center font-bold'>Create Account</h1>
            <div className='max-w-md mx-auto  p-5 border dark:bg-gray-800 rounded-md'>
                <form onSubmit={handleSubmit( loginHandler )} className="">
                    <InputField error={errors.name?.message} type="name" label="Name" id="name" placeholder="Dharam"
                        {
                        ...register( 'name', {
                            required: "required",
                            pattern: {
                                value: /^[A-Za-z]+(([,.] |[ '-])[A-Za-z]+)*([.,'-]?)$/,
                                message: "Ex - Dharmendra Kumar",
                            }
                        } )
                        }
                    >

                    </InputField>
                    <InputField error={errors.email?.message} type="email" label="Email" id="email" placeholder="test@gmail.com"
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
                        <Button disabled={disabled} type='submit'>Verify Account</Button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Signup