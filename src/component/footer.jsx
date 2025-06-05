import React from 'react'
import './footer.css'
import "remixicon/fonts/remixicon.css";

function Footer() {
    return (
        <>
            <div className="footer">
                <div>

                    <hr className='def-hr' />
                </div>
                <div className="social ">
                    <ul className='tw-flex'>
                        <div className="findme">
                            <li>Find me in:</li>
                        </div>
                        <div className="social tw-flex">
                            <li className='tw-mx-2 separator'></li>
                            <li><a href='https://www.facebook.com/aadarshaadman6264'><i class="ri-facebook-circle-fill footer-icon"></i></a></li>
                            <li className='tw-mx-2 separator'></li>
                            <li><a href='https://www.instagram.com/iamyouraadi/'><i class="ri-instagram-fill footer-icon"></i></a></li>
                            <li className='tw-mx-2 separator'></li>
                            <li><i class="ri-linkedin-box-fill  footer-icon"></i></li>
                            <li className='tw-mx-2 separator'></li>
                        </div>
                    </ul>
                    <ul>
                        <div className="github tw-flex">
                            <li className='tw-mx-2 separator'></li>
                            <li><a href='https://github.com/aadik6'>aadik6  <i class="ri-github-fill footer-icon" ></i></a></li>
                        </div>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Footer