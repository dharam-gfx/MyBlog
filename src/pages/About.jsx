import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import authService from '../appwrite/Auth';
import { useNavigate } from 'react-router-dom';
const About = () => {
  const [userDetails, setUserDetails] = useState( {
    name: "Please Wait...",
    email: "Please Wait...",
    phone: 'Please Wait...',
    address: 'Please Wait...',
  } )

  const navigate = useNavigate()
  useEffect( () => {
    getUser();
  }, [] )

  async function getUser() {

    await authService.getCurrentUser().then( user => {
      if(user) setUserDetails( user );
      else  navigate("/login")
    } ).catch( error => {
      console.log( "getCurrentUser", error );
      navigate("/login")

    } )

  }
  return (
    <div className='min-h-[calc(100vh-242px)] dark:bg-gray-900 dark:text-white pt-16 px-4'>
      <div className="overflow-hidden shadow rounded-lg border max-w-[400px] mx-auto">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium dark:text-white text-gray-900">
            Your Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm  text-gray-500">
            This is some information about you.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Full name
              </dt>
              <dd className="dark:text-white mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userDetails.name || 'NULL'}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 dark:text-white text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userDetails.email || 'NULL'}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 dark:text-white text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userDetails.phone || 'NULL'}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Address
              </dt>
              <dd className="mt-1 dark:text-white text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userDetails.address || 'NULL'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default About