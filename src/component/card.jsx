import React from 'react';

function Card({ img, icon, para, gitlink, hostedLink }) {
    return (
        <>
            <div className="desktop">
                <div className="tw-flex tw-justify-center tw-items-center tw-gap-8 tw-p-8 tw-flex-wrap">
                    <div className="tw-card tw-bg-[#1e293b] tw-rounded-[8px] tw-shadow-lg tw-overflow-hidden tw-max-w-[300px] tw-h-[370px] tw-border tw-border-transparent hover:tw-border-[#43D9AD] tw-transition tw-duration-300">
                        {/* Image Section */}
                        <div className="tw-relative">
                            <img src={img} alt="Project_image" className="tw-w-full tw-h-40 tw-object-cover" />
                            {icon && (
                                <i
                                    className={`${icon} tw-absolute tw-top-3 tw-right-3 tw-bg-[#0ea5e9] tw-rounded-md tw-text-black tw-p-1`}
                                ></i>
                            )}
                        </div>
                        {/* Content Section */}
                        <div className="tw-p-2 tw-flex tw-flex-col tw-h-[calc(100%-160px)]">
                            <p className="tw-text-[#607B96] tw-my-3 tw-text-left tw-flex-1">{para}</p>
                            <div className="tw-flex tw-justify-end tw-gap-2">
                                {gitlink && (
                                    <a href={gitlink}>
                                        <i className="ri-github-fill tw-text-[#607B96] tw-text-[18px]"></i>
                                    </a>
                                )}
                                {hostedLink && (
                                    <a href={hostedLink}>
                                        <i className="ri-cast-line tw-text-[#607B96] tw-text-[18px]"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-card">
                <div className="tw-flex tw-justify-center tw-items-center tw-gap-8 tw-p-8 tw-flex-wrap">
                    <div className="tw-card tw-bg-[#1e293b] tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-max-w-[300px] tw-h-[400px] tw-border tw-border-transparent hover:tw-border-green-500 tw-transition tw-duration-300">
                        {/* Image Section */}
                        <img src={img} alt="Project" className="tw-w-full tw-h-40 tw-object-cover" />
                        {/* Content Section */}
                        <div className="tw-p-2 tw-flex tw-flex-col tw-h-[calc(100%-160px)]">
                            <p className="tw-text-[#607B96] tw-my-3 tw-text-left tw-flex-1">{para}</p>
                            <div className="tw-flex tw-justify-end tw-gap-2">
                                {gitlink && (
                                    <a href={gitlink}>
                                        <i className="ri-github-fill tw-text-[#607B96] tw-text-[18px]"></i>
                                    </a>
                                )}
                                {hostedLink && (
                                    <a href={hostedLink}>
                                        <i className="ri-cast-line tw-text-[#607B96] tw-text-[18px]"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
