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
                            <li><a href='https://www.facebook.com/aadarshaadman6264' target="_blank" rel="noopener noreferrer"><i className="ri-facebook-circle-fill footer-icon"></i></a></li>
                            <li className='tw-mx-2 separator'></li>
                            <li><a href='https://www.instagram.com/iamyouraadi/' target="_blank" rel="noopener noreferrer"><i className="ri-instagram-fill footer-icon"></i></a></li>
                            <li className='tw-mx-2 separator'></li>
                            <li><a href='https://www.linkedin.com/in/aadarsh-kushwaha-09a9451b4/' target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-box-fill footer-icon"></i></a></li>
                            <li className='tw-mx-2 separator'></li>
                        </div>
                    </ul>
                    <ul>
                        <div className="github tw-flex">
                            <li className='tw-mx-2 separator'></li>
                            <li><a href='https://github.com/aadik6' target="_blank" rel="noopener noreferrer">aadik6  <i className="ri-github-fill footer-icon"></i></a></li>
                        </div>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Footer