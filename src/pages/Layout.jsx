import React, { useEffect } from 'react'
import { Footer, Header, ScrollButton } from './index';
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux'
import authService from '../appwrite/Auth.js'
import { login, logout } from '../features/AuthSlice.js';

const Layout = () => {
    const dispatch = useDispatch()
    useEffect( () => {
        authService.getCurrentUser().then( user => {
          //  console.log( "userInfo", user );
            if ( user ) {
                dispatch( login( user ) )
            }
            else {
                dispatch( logout() )
            }
        } ).catch( error => {
            console.log( "getCurrentUser", error );
        } )
    }, [] )

    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollButton></ScrollButton>
        </div>
    )
}

export default Layout