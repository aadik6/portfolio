import React from 'react'
import './contact.css'

function Contact() {
    return (
        <>
            <div className="desktop">
                <div className="top-contact tw-flex">
                    <div className="side">
                        <p className='tw-text-white tw-ml-[20px] tw-w-[268.5px]'><i class="ri-arrow-down-s-fill tw-text-white"></i>contacts</p>
                        <hr className='contact-hr' />
                        <div className="contact-email tw-mt-4 tw-ml-1">
                            <p className='tw-flex tw-gap-[3px] tw-text-[#64748b]'><i class="ri-mail-fill tw-text-[#64748b]"></i>aadarshkumarman@gmail.com</p>
                            <p className='tw-flex tw-gap-[3px] tw-text-[#64748b]'><i class="ri-phone-fill tw-text-[#64748b]"></i>98068144329</p>
                        </div>
                    </div>
                    <div className="separator2"></div>
                </div>
            </div>
            <div className="mobile">
                <p className='tw-text-center'>Desktop version is constructing now</p>
            </div>
        </>
    )
}

export default Contact