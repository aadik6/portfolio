import React from 'react'
import "./header.css"

function MobileFooter() {
    return (
        <>
            <div className="mobile-footer">
                <hr className='def-hr' />
                <ul className='tw-flex tw-justify-between tw-items-center tw-mx-1'>
                    <div className="left">
                        <li>Find me in:</li>
                    </div>
                    <div className="right tw-flex">
                        <li className='tw-mx-8 separator1'></li>
                        <li><a href='https://www.facebook.com/aadarshaadman6264' target="_blank" rel="noopener noreferrer"><i className="ri-facebook-circle-line footer-icon"></i></a></li>
                        <li className='tw-mx-8 separator1'></li>
                        <li><a href='https://www.instagram.com/iamyouraadi/' target="_blank" rel="noopener noreferrer"><i className="ri-instagram-line footer-icon"></i></a></li>
                        <li className='tw-mx-8 separator1'></li>
                        <li><a href='https://www.linkedin.com/in/aadarsh-kushwaha-09a9451b4/' target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-box-line footer-icon"></i></a></li>
                        <li className='tw-mx-8 separator1'></li>
                        <li><a href='https://github.com/aadik6' target="_blank" rel="noopener noreferrer"><i className="ri-github-fill footer-icon"></i></a></li>
                    </div>
                </ul>
                <hr className='def-hr' />
            </div>
        </>
    )
}

export default MobileFooter