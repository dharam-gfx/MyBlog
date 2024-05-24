import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <>
        <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MyBlog</span>
        </Link>
    </>
  )
}

export default Logo