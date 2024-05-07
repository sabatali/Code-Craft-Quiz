import React from 'react'
import logo from '../assets/logo.png'

function Logo({ width = '500px' }) {
    return (
        <div>
            <img src={logo} alt="" width={'100px'} />
        </div>
    )
}

export default Logo