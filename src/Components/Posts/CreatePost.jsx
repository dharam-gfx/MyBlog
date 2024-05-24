import React, { useEffect, useRef } from 'react'
import { PostFrom, TinyEditor } from '../../pages/index'
const CreatePost = () => {
  return (
    <div className='p-5 dark:bg-gray-900 min-h-[calc(100vh-242px)]'>
      <PostFrom></PostFrom>
    </div>
  )
}

export default CreatePost