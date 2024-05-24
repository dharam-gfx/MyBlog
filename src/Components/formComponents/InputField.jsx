import React, { forwardRef, useEffect, useRef } from 'react'

const InputField = forwardRef( ( {
    placeholder = '',
    label = '',
    className = '',
    type = '',
    id = '',
    error = '',
    ...props
}, ref ) => {
    const currentRef = useRef();
    const [passwordShowHide, setPasswordShowHide] = React.useState( true );

    return (
        <div className=" relative">
            <label htmlFor={id} className="block mb-2 font-medium text-gray-900 dark:text-white">{label} {passwordShowHide}</label>
            <input 
            ref={( e ) => {
                ref( e );
                currentRef.current = e ;// you can still assign to ref
            }} 
            type={type} id={id} {...props} className={`${className} bg-gray-50 border border-${error ?'red': 'gray'}-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-${error ?'red': 'gray'}-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={placeholder} />
            {
                type === 'password' ?
                    <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-11 right-3 cursor-pointer">
                        {
                            passwordShowHide
                                ?
                                <div onClick={() => {
                                    if ( currentRef.current?.type === 'password' ) {
                                        currentRef.current.type = 'text';
                                        setPasswordShowHide( false )
                                    }
                                }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                </div> : null
                        }
                        {
                            !passwordShowHide ?
                                <div onClick={() => {
                                    if ( currentRef.current?.type === 'text' ) {
                                        currentRef.current.type = 'password';
                                        setPasswordShowHide( true );
                                    }
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w- h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                </div> : null
                        }

                    </div> : null
            }
            {
                <p className='text-red-500 h-6 text-sm mt-[4px]'>{error}</p>
            }
        </div>
    )
} )

export default InputField