import React from 'react'

function Card({ img, icon, para, gitlink, hostedLink }) {
    return (
        <>
            <div className="desktop">
                <div className="tw-flex tw-justify-center tw-items-center tw-gap-8 tw-p-8 tw-flex-wrap">
                    <div className="tw-card tw-bg-[#1e293b] tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-max-w-[300px]">
                        {/* Image Section */}
                        <div className="tw-relative">
                            <img src={img} alt="Project" className="tw-w-full tw-h-40 tw-object-cover" />
                            {icon &&
                                <i className={`${icon} tw-absolute tw-top-3 tw-right-3 tw-bg-[#0ea5e9] tw-rounded-md tw-text-black tw-p-1`}></i>
                            }
                        </div>
                        {/* Content Section */}
                        <div className="tw-p-2 tw-flex tw-flex-col tw-items-center">
                            <p className="tw-text-[#cbd5e1] tw-my-3 tw-text-left">{para}</p>
                            <div className="tw-flex tw-justify-start tw-gap-2">
                                {gitlink &&
                                    <a
                                        href={gitlink}
                                        className="tw-bg-[#334155] tw-text-white tw-rounded tw-px-4 tw-py-2 tw-text-sm tw-uppercase tw-shadow-md hover:tw-bg-[#475569]"
                                    >
                                        GitHub
                                    </a>}
                                <a
                                    href={hostedLink}
                                    className="tw-bg-[#0ea5e9] tw-text-white tw-rounded tw-px-4 tw-py-2 tw-text-sm tw-uppercase tw-shadow-md hover:tw-bg-[#0284c7]"
                                >
                                    View Project
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="mobile">

            </div>
        </>
    )
}

export default Card