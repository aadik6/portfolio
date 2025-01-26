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
                        <li><a href='https://www.facebook.com/aadarshaadman6264'><i class="ri-facebook-circle-line footer-icon"></i></a></li>
                        <li className='tw-mx-8 separator1'></li>
                        <li><a href='https://www.instagram.com/iamyouraadi/'><i class="ri-instagram-line footer-icon"></i></a></li>
                        <li className='tw-mx-8 separator1'></li>
                        <li><a href=''><i class="ri-linkedin-box-line footer-icon"></i></a></li>
                        <li className='tw-mx-8 separator1'></li>
                        <li><a href='https://github.com/aadik6'><i class="ri-github-fill footer-icon"></i></a></li>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default MobileFooter