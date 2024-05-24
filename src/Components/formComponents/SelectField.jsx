import React, { forwardRef, useId } from 'react'

const SelectField = forwardRef( ( {
    placeholder = '',
    label = '',
    className = '',
    type = '',
    id = '',
    error = '',
    options = [],
    ...props
}, ref ) => {
    return (
        <>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <select {...props} ref={ref} id={id} className={`${className} bg-gray-50 border border-${error ? 'red' : 'gray'}-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-${error ? 'red' : 'gray'}-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                <option defaultValue=''>Choose a country</option>
                {
                    options.map( item => <option key={useId()} defaultValue=''>{item}</option> ) ?? ''
                }
            </select>
            {
                <p className='text-red-500 h-6 text-sm mt-[4px]'>{error}</p>
            }
        </>
    )
} )

export default SelectField