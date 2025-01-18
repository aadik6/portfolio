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
                            <li><i class="ri-facebook-circle-fill footer-icon"></i></li>
                            <li className='tw-mx-2 separator'></li>
                            <li><i class="ri-instagram-fill footer-icon"></i></li>
                            <li className='tw-mx-2 separator'></li>
                            <li><i class="ri-linkedin-box-fill  footer-icon"></i></li>
                            <li className='tw-mx-2 separator'></li>
                        </div>
                    </ul>
                    <ul>
                        <div className="github tw-flex">
                            <li className='tw-mx-2 separator'></li>
                            <li>github  <i class="ri-github-fill footer-icon" ></i></li>
                        </div>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Footer