import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function signIn() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black'>
      <SignIn/>
    </div>
  )
}

export default signIn