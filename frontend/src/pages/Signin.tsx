import React from 'react'
import AuthComponent from '../components/AuthComponent'
import Quote from '../components/Quote'

const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <AuthComponent type="signin" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  )
}

export default Signin
