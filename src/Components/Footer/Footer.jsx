import React from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '../../pages/index'

const Footer = () => {

  const navBar = [
    {
      name: "Home",
      path: "/",
      active: true
    },
    {
      name: "About",
      path: "/about",
      active: true
    },
  ]
  return (

    <footer className="bg-white  shadow dark:bg-gray-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className='mb-4 md:mb-0'>
            <Logo></Logo>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {
              navBar.map( item => (
                item.active ? <li key={item.name} >
                  <NavLink onClick={() => setIsMobile( false )} to={item.path} className="hover:underline me-4 md:me-6">{item.name} </NavLink>
                </li> : null
              ) )
            }
          </ul>
        </div>
      </div>
      <hr className="mb-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mb-8" />
      <span className="block text-sm pb-6 text-gray-500 text-center dark:text-gray-400">© 2024 <a href="https://dharam-gfx.netlify.app/" target='_blank' className="hover:underline">Dharam_GFX</a>. All Rights Reserved.</span>
    </footer>
  )
}

export default Footer