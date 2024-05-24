import React, { useEffect } from 'react'
import { Button, InputField } from '../pages/index'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/AuthSlice';
import authService from '../appwrite/Auth'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authenticated = useSelector( ( state ) => state.AuthReducer.userAuth.status );

    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect( () => {
        authenticated && navigate( '/' );
    }, [authenticated] );

    const loginHandler = async ( { email, password } ) => {
        console.log( "data", email, password );
        try {
            const session = await authService.login( { email, password } );
            session && authService.getCurrentUser().then( user => {
                dispatch( login( user ) );
                toast.success( "Login Successfully." );

            } )
        } catch ( error ) {
            console.log( "Error from loginHandler", error.message );
            toast.warning( "Please check the email and password." );
        }


    }
    return (
        <div className="dark:bg-gray-900 p-5 h-[calc(100vh-160px)]">
        <h1 className='dark:text-white text-3xl mb-5 text-center font-bold'>Login</h1>

            <div className='max-w-md mx-auto  p-5 border dark:bg-gray-800 rounded-md'>
                <form onSubmit={handleSubmit( loginHandler )} className="">
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
                        <Button type='submit'>Submit</Button>
                    </div>
                    <div className="text-center border-b border-gray-200" style={{ "lineHeight": "0px" }}>
                        <span className="p-2 text-xs font-semibold tracking-wide text-gray-600 dark:text-white uppercase bg-white dark:bg-gray-800" style={{ "lineHeight": "0px" }}>Or</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Button onClick={()=>{
                            authService.googleLogin()
                        }} className='flex justify-center items-center' bgColor='red'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" >
                                <path
                                    d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z"
                                />
                            </svg>
                            <span className='pl-1'>

                                Google
                            </span>
                        </Button>
                        <Button className='flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" >
                                <path
                                    d="M19.665,16.811c-0.287,0.664-0.627,1.275-1.021,1.837c-0.537,0.767-0.978,1.297-1.316,1.592	c-0.525,0.482-1.089,0.73-1.692,0.744c-0.432,0-0.954-0.123-1.562-0.373c-0.61-0.249-1.17-0.371-1.683-0.371	c-0.537,0-1.113,0.122-1.73,0.371c-0.616,0.25-1.114,0.381-1.495,0.393c-0.577,0.025-1.154-0.229-1.729-0.764	c-0.367-0.32-0.826-0.87-1.377-1.648c-0.59-0.829-1.075-1.794-1.455-2.891c-0.407-1.187-0.611-2.335-0.611-3.447	c0-1.273,0.275-2.372,0.826-3.292c0.434-0.74,1.01-1.323,1.73-1.751C7.271,6.782,8.051,6.563,8.89,6.549	c0.46,0,1.063,0.142,1.81,0.422s1.227,0.422,1.436,0.422c0.158,0,0.689-0.167,1.593-0.498c0.853-0.307,1.573-0.434,2.163-0.384	c1.6,0.129,2.801,0.759,3.6,1.895c-1.43,0.867-2.137,2.08-2.123,3.637c0.012,1.213,0.453,2.222,1.317,3.023	c0.392,0.372,0.829,0.659,1.315,0.863C19.895,16.236,19.783,16.529,19.665,16.811L19.665,16.811z M15.998,2.38	c0,0.95-0.348,1.838-1.039,2.659c-0.836,0.976-1.846,1.541-2.941,1.452c-0.014-0.114-0.021-0.234-0.021-0.36	c0-0.913,0.396-1.889,1.103-2.688c0.352-0.404,0.8-0.741,1.343-1.009c0.542-0.264,1.054-0.41,1.536-0.435	C15.992,2.127,15.998,2.254,15.998,2.38L15.998,2.38z"
                                />
                            </svg>
                            <span className='pl-1'>Apple</span>
                        </Button>
                    </div>
                    <div><Link to="/forget-password" className='text-blue-600 text-center pt-4 block underline cursor-pointer '>Forget Password</Link></div>
                </form>
            </div>

        </div>
    )
}

export default Login