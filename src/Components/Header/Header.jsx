import React, { useEffect, useState } from 'react'
import { LogoutBtn, ThemeBtn, Logo } from '../../pages/index';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../Theme/ThemeContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = () => {

  const [isMobile, setIsMobile] = useState( false );
  const [themeMode, setThemeMode] = useState( localStorage.getItem( "themeMode" ) || "light" );
  const navigator = useNavigate()
  const darkTheme = () => {
    setThemeMode( "dark" );
  }
  const lightTheme = () => {
    setThemeMode( "light" );
  }

  useEffect( () => {
    const root = document.querySelector( "html" );
    root.classList.remove( "dark", "light" );
    root.classList.add( themeMode );
    localStorage.setItem( "themeMode", themeMode )
  }, [themeMode] )
  const authenticated = useSelector( ( state ) => state.AuthReducer.userAuth.status );

  const navBar = [
    {
      name: "Home",
      path: "/",
      active: true
    },
    {
      name: "Create Post",
      path: "/create-post",
      active: authenticated
    },
    {
      name: "About",
      path: "/about",
      active: true
    },
  ]

  const getAuthBtns = () => {
    return (
      authenticated ?
        <LogoutBtn></LogoutBtn>
        :
        <>
          <button onClick={() => navigator( "/login" )} type="button" className="text-white transition-colors bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
          <button onClick={() => navigator( "/signup" )} type="button" className="text-white ml-3 transition-colors bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SignUp</button>
        </>
    )
  }

  return (

    <div>
      <ToastContainer
        autoClose={2000}
        theme={themeMode}
      />

      <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Logo></Logo>
          <div className="flex md:order-2 space-x-3  rtl:space-x-reverse">
            <div className='hidden md:block'>
              {
                getAuthBtns()
              }
            </div>


            <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
              <ThemeBtn className="mt-[4px]"></ThemeBtn>
            </ThemeProvider>


            <button onClick={() => setIsMobile( !isMobile )} data-collapse-toggle="navbar-sticky" type="button" className="transition-colors inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {
                !isMobile ?
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>


              }
            </button>
          </div>
          <div className={` ${isMobile ? '' : 'hidden'} items-center justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-sticky`}>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {
                navBar.map( item => (
                  item.active ? <li key={item.name} >
                    <NavLink onClick={() => setIsMobile( false )} to={item.path} className=" block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{item.name} </NavLink>
                  </li> : null
                ) )
              }
              <li className='md:hidden'>
                {
                  getAuthBtns()
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header