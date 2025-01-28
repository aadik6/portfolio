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
                        <div className="tw-p-2 tw-flex tw-flex-col ">
                            <p className="tw-text-[#607B96] tw-my-3 tw-text-left">{para}</p>
                            <div className="tw-flex tw-justify-end tw-gap-2">
                                {gitlink &&
                                    <a
                                        href={gitlink}
                                    >
                                        <i class="ri-github-fill tw-text-[#607B96] tw-text-[18px]"></i>
                                    </a>}
                                {hostedLink &&
                                    <a
                                        href={hostedLink}
                                    >
                                        <i class="ri-cast-line tw-text-[#607B96] tw-text-[18px]"></i>
                                    </a>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="mobile-card">
                <div className="tw-flex tw-justify-center tw-items-center tw-gap-8 tw-p-8 tw-flex-wrap">
                    <div className="tw-card tw-bg-[#1e293b] tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-max-w-[300px]">
                        {/* Image Section */}
                        {/* <div className="tw-relative"> */}
                            <img src={img} alt="Project" className="tw-w-full tw-h-40 tw-object-cover" />
                            {/* {icon &&
                                <i className={`${icon} tw-absolute tw-top-3 tw-right-3 tw-bg-[#0ea5e9] tw-rounded-md tw-text-black tw-p-1`}></i>
                            } */}
                        {/* </div> */}
                        {/* Content Section */}
                        <div className="tw-p-2 tw-flex tw-flex-col ">
                            <p className="tw-text-[#607B96] tw-my-3 tw-text-left">{para}</p>
                            <div className="tw-flex tw-justify-end tw-gap-2">
                                {gitlink &&
                                    <a
                                        href={gitlink}
                                    >
                                        <i class="ri-github-fill tw-text-[#607B96] tw-text-[18px]"></i>
                                    </a>}
                                {hostedLink &&
                                    <a
                                        href={hostedLink}
                                    >
                                        <i class="ri-cast-line tw-text-[#607B96] tw-text-[18px]"></i>
                                    </a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card