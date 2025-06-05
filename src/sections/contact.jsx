import React, { useState, useEffect } from 'react'
import './contact.css'
// import '../component/header.css'
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MobileFooter from '../component/mobileFooter';

const schema = z.object({
    name: z
        .string()
        .regex(/^[A-Za-z]+\s[A-Za-z]+$/, "Enter valid name [Aadi k]"),
    email: z
        .string()
        .email("Enter valid email")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, "Email must be valid"),
    message: z.string(),
});

function Contact() {
    const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => setIsDesktopView(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [mobileContactOpen, setMobileContactOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const submit = async (data) => {
        try {
            const response = await fetch("https://formspree.io/f/xnnjzadn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setFormSubmitted(true);
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({ resolver: zodResolver(schema) });
    const liveCode = {
        name: watch('name', ''),
        email: watch('email', ''),
        message: watch('message', ''),
        date: new Date().toDateString(),
    };

    return (
        <>
            {isDesktopView ?
                <div className="desktop">
                    <div className="tw-flex">
                        <div className="top-contact tw-flex">
                            <div className="side">
                                <p className='tw-text-white tw-ml-[20px] tw-w-[268.5px]'><i class="ri-arrow-down-s-fill tw-text-white"></i>contacts</p>
                                <hr className='contact-hr' />
                                <div className="contact-email tw-mt-4 tw-ml-1">
                                    <p className='tw-flex tw-gap-[3px] tw-text-[#64748b]'><i class="ri-mail-fill tw-text-[#64748b]"></i>aadarshkumarman@gmail.com</p>
                                    <p className='tw-flex tw-gap-[3px] tw-text-[#64748b]'><i class="ri-phone-fill tw-text-[#64748b]"></i>9806814329</p>
                                </div>
                            </div>
                            <div className="separator2"></div>
                            <div className="tw-flex">
                                {formSubmitted ?
                                    <div className='thanks tw-flex tw-flex-col tw-items-center tw-justify-center'>
                                        <h1 className='tw-text-white tw-text-[18px]'>Thank you! 🤞</h1>
                                        <span className='tw-text-[#607B96] tw-text-center'>your message has been accepted. You will recieve answer really soon!</span>
                                        <button className='tw-text-white tw-bg-[#1C2B3A] tw-p-1 tw-rounded tw-text-[14px] tw-mt-2' onClick={() => { setFormSubmitted(false); reset(); }}>sent-new-message</button>
                                    </div>
                                    : <form onSubmit={handleSubmit(submit)} className="form tw-w-52 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-ml-5">
                                        <div className="tw-flex tw-flex-col tw-gap-1 ">
                                            <label htmlFor="name" className='tw-text-[#607B96]'>_name:</label>
                                            <input type="text" {...register('name')} />
                                            {errors.name && <p className='tw-text-[#C98BDF] tw-text-[12px] tw-mt-[-15px]'>{errors.name.message}</p>}
                                        </div>
                                        <div className="tw-flex tw-flex-col tw-gap-1">
                                            <label htmlFor="email" className='tw-text-[#607B96]'>_email:</label>
                                            <input type="email" {...register('email')} />
                                            {errors.email && <p className='tw-text-[#C98BDF] tw-text-[12px] tw-mt-[-15px]'>{errors.email.message}</p>}
                                        </div>
                                        <div className="tw-flex tw-flex-col tw-gap-1">
                                            <label htmlFor="message" className='tw-text-[#607B96]'>_messages:</label>
                                            <textarea type="text" {...register('message')} />
                                            {errors.message && <p className='tw-text-[#607B96] tw-text-[12px] tw-mt-[-12px]'>{errors.message.message}</p>}
                                        </div>
                                        <button type='submit' className='tw-p-2 tw-bg-[#1C2B3A] tw-rounded tw-text-[#FFFFFF] tw-text-[14px]'>submit-message</button>
                                    </form>}

                                <div className="separator2"></div>
                                <div className="formCode tw-flex tw-flex-col tw-justify-center">
                                    <div className="code-container1 tw-flex tw-items-center">
                                        <pre>
                                            <code>
                                                <div><span className="line-number">1</span> <span className="keyword">const </span>{" "}
                                                    <span className="variable">button</span> = document.querySelector(
                                                    <span className="string">'#sendBtn'</span>);
                                                </div>
                                                <div><span className="line-number">2</span></div>
                                                <div><span className="line-number">3</span> <span className="keyword">const </span> <span className="variable">message</span> = {"{"}</div>
                                                <div><span className="line-number">4</span> &nbsp;&nbsp;<span className="property">name</span>:{" "}
                                                    <span className="string">"{liveCode.name}"</span>,</div>
                                                <div><span className="line-number">5</span> &nbsp;&nbsp;<span className="property">email</span>:{" "}
                                                    <span className="string">"{liveCode.email}"</span>,</div>
                                                <div><span className="line-number">6</span> &nbsp;&nbsp;<span className="property">message</span>:{" "}
                                                    <span className="string">"{liveCode.message}"</span>,</div>
                                                <div><span className="line-number">7</span> &nbsp;&nbsp;<span className="property">date</span>:{" "}
                                                    <span className="string">"{liveCode.date}"</span></div>
                                                <div><span className="line-number">8</span> {"}"};</div>
                                                <div><span className="line-number">9</span></div>
                                                <div><span className="line-number">10</span> <span className="variable">button</span>.<span className="function">addEventListener</span>(
                                                    <span className="string">'click'</span>, () {"=>"} {"{"}</div>
                                                <div><span className="line-number">11</span> &nbsp;&nbsp;form.<span className="function">send</span>(
                                                    <span className="variable">message</span>);</div>
                                                <div><span className="line-number">12</span> {"}"});</div>
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className="mobile">
                    <div className="top-cont">
                        <p className='tw-mt-3 tw-ml-5 tw-text-white'>_contact-me</p>
                        <div className="mobile-contacts tw-mt-3 tw-text-white">
                            <span className='tw-text-white tw-bg-[#1E2D3D] tw-w-[100vw] tw-block' onClick={() => { setMobileContactOpen(!mobileContactOpen) }}><i className={`ri-arrow-${mobileContactOpen ? "down" : "right"}-s-fill tw-text-white tw-bg-[#1E2D3D] tw-ml-5`}></i>contacts</span>
                            {mobileContactOpen &&
                                <div className='tw-mt-2 tw-ml-5'>
                                    <p className='tw-flex tw-gap-[3px] tw-text-[#64748b]'><i class="ri-mail-fill tw-text-[#64748b]"></i>aadarshkumarman@gmail.com</p>
                                    <p className='tw-flex tw-gap-[3px] tw-text-[#64748b]'><i class="ri-phone-fill tw-text-[#64748b]"></i>9806814329</p>
                                </div>}

                        </div>
                        {
                            formSubmitted ?
                                <div className='mobile-thanks tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-5'>
                                    <h1 className='tw-text-white tw-text-[18px]'>Thank you! 🤞</h1>
                                    <span className='tw-text-[#607B96] tw-text-center'>your message has been accepted. You will recieve answer really soon!</span>
                                    <button className='tw-text-white tw-bg-[#1C2B3A] tw-p-1 tw-rounded tw-text-[14px] tw-mt-3' onClick={() => { setFormSubmitted(false);reset(); }}>sent-new-message</button>
                                </div> :
                                <form onSubmit={handleSubmit(submit)} className="mobile-form  tw-flex tw-flex-col tw-p-5 tw-justify-center tw-gap-2 ">
                                    <div className="tw-flex tw-flex-col tw-gap-1 ">
                                        <label htmlFor="name" className='tw-text-[#607B96]'>_name:</label>
                                        <input type="text" {...register('name')} />
                                        {errors.name && <p className='tw-text-[#C98BDF] tw-text-[12px] tw-mt-[-15px]'>{errors.name.message}</p>}
                                    </div>
                                    <div className="tw-flex tw-flex-col tw-gap-1">
                                        <label htmlFor="email" className='tw-text-[#607B96]'>_email:</label>
                                        <input type="email" {...register('email')} />
                                        {errors.email && <p className='tw-text-[#C98BDF] tw-text-[12px] tw-mt-[-15px]'>{errors.email.message}</p>}
                                    </div>
                                    <div className="tw-flex tw-flex-col tw-gap-1">
                                        <label htmlFor="message" className='tw-text-[#607B96]'>_messages:</label>
                                        <textarea type="text" {...register('message')} />
                                        {errors.message && <p className='tw-text-[#607B96] tw-text-[12px] tw-mt-[-12px]'>{errors.message.message}</p>}
                                    </div>
                                    <button type='submit' className='tw-p-2 tw-bg-[#1C2B3A] tw-rounded tw-text-[#FFFFFF] tw-text-[14px]'>submit-message</button>
                                </form>
                        }
                        <MobileFooter />
                    </div>
                </div>}
        </>
    )
}

export default Contact