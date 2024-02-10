import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='home-page'>
        <h1>Welcome!</h1>
        <Link to='/login'>
        <button>LOG IN</button>
        </Link>
        <Link to='/register'>
        <button>SIGN UP</button>
        </Link>
    </div>
  )
}

export default HomePage