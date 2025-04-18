import React, { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import Footer from "./footer";
import MobileFooter from "./mobileFooter";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toogleIcon = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <>
      <div className="desktop">
        <div className="nav tw-container">
          <ul className="menu">
            <div className="logo">
              <li>
                <Link to="/" className="tw-text-[#607B96]">
                  Aadarsh Kushwaha
                </Link>
              </li>
            </div>
            <div className="menu-right">
              <li className="tw-mx-8 separator"></li>
              <li>
                <NavLink to="/">_hello</NavLink>
              </li>
              <li className="tw-mx-8 separator"></li>
              <li>
                <NavLink to="about">_about-me</NavLink>
              </li>
              <li className="tw-mx-8 separator"></li>
              <li>
                <NavLink to="projects">_projects</NavLink>
              </li>
              <li className="tw-mx-8 separator"></li>
            </div>
          </ul>
          <ul>
            <div className="menu-left tw-flex">
              <li className="tw-mx-8 separator"></li>
              <li>
                <NavLink to="/contact">_contact-me</NavLink>
              </li>
            </div>
          </ul>
        </div>
        <hr className="def-hr"></hr>
      </div>
      <div className={`mobile ${isMenuOpen ? "open" : "closed"}`}>
        <div className="mobile-nav">
          <ul className="tw-flex tw-justify-between">
            <li>Aadarsh Kushwaha</li>
            {isMenuOpen ? (
              <li className="icon" onClick={toogleIcon}>
                <i class="ri-close-fill footer-icon mobile-nav-icon"></i>
              </li>
            ) : (
              <li className="icon" onClick={toogleIcon}>
                <i class="ri-menu-line footer-icon mobile-nav-icon"></i>
              </li>
            )}
          </ul>
          <hr className="def-hr" />
          {isMenuOpen && (
            <>
              <div className="mobile-nav-menu">
                <ul className="tw-flex tw-flex-col tw-text-center">
                  <li onClick={toogleIcon}>
                    <NavLink to="/">_hello</NavLink>
                  </li>
                  <hr className="def-hr" />
                  <li onClick={toogleIcon}>
                    <NavLink to="/about">_about-me</NavLink>
                  </li>
                  <hr className="def-hr" />
                  <li onClick={toogleIcon}>
                    <NavLink to="/projects">_projects</NavLink>
                  </li>
                  <hr className="def-hr" />
                  <li onClick={toogleIcon}>
                    <NavLink to="/contact">_contact</NavLink>
                  </li>
                  <hr className="def-hr" />
                </ul>
              </div>
              {/* <div className="mobile-footer">
                                <hr className='def-hr' />
                                <ul className='tw-flex tw-justify-between tw-mx-1'>
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
                            </div> */}
              <MobileFooter />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
