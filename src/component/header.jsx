import React from 'react'
import "./header.css"
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <>
            {/* <div className="parent-nav"> */}
            <div className="nav">

                <ul className='menu'>
                    <div className='logo'>
                        <li>Aadarsh Kushwaha</li>

                    </div>
                    <div className="menu-right">
                        <li className='tw-mx-8 separator'></li>
                        <li>
                            <NavLink to='/'>_hello</NavLink>
                        </li>
                        <li className='tw-mx-8 separator'></li>
                        <li>_about-me</li>
                        <li className='tw-mx-8 separator'></li>
                        <li>_project</li>
                        <li className='tw-mx-8 separator'></li>
                    </div>
                </ul>
                <ul>
                    <div className="menu-left tw-flex">
                        <li className='tw-mx-8 separator'></li>
                        <li>_contact-me</li>
                    </div>
                </ul>
            </div>
            <hr className='def-hr'></hr>
            {/* </div> */}
        </>

    )
}

export default Header