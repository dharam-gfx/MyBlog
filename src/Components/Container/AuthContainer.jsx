import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../appwrite/Auth';
import { BallTriangle } from 'react-loader-spinner';

const AuthContainer = ( { children } ) => {
  const authenticated = useSelector( ( state ) => state.AuthReducer.userAuth.status );
  const [emailVerified, setEmailVerified] = useState( false );
  const navigate = useNavigate()
  useEffect( () => {
    if ( !authenticated ) {
      navigate( "/login" );
    }
    authService.getCurrentUser().then( user => {
      setEmailVerified( user?.emailVerification || false )
      if ( !user.emailVerification ) {
        navigate( "/verify-email" );
      }
    } ).catch( error => {
      console.log( "getCurrentUser", error );
    } )

  }, [authenticated] )
  return (
    <>{emailVerified ?
      children
      : <div >
        <BallTriangle
          height={50}
          width={50}
          radius={5}
          color="blue"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass="dark:bg-gray-900 flex justify-center h-[65vh] items-center"
          visible={!emailVerified}
        />
      </div>
    }</>
  )
}

export default AuthContainer