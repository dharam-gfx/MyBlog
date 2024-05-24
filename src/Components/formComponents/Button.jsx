import React from 'react'

const Button = ( {
  className = '',
  bgColor = "blue",
  children = "submit",
  type = "button",
  disabled = false,
  ...props
} ) => {
  return (
    <button disabled={disabled} type={`${type}`}
      {...props} className={` text-white ${className} ${disabled ? 'cursor-not-allowed' : ''}  bg-${bgColor}-700 hover:bg-${bgColor}-800 focus:ring-4 focus:outline-none focus:ring-${bgColor}-300 font-medium rounded-lg w-full transition-colors px-5 py-2.5 text-center  dark:focus:ring-${bgColor}-800 `} >{children}</button>
  )
}

export default Button