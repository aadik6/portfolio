'use client';

import React, { useState } from "react";
import "./header.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "remixicon/fonts/remixicon.css";
import Footer from "./footer";
import MobileFooter from "./mobileFooter";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  const toogleIcon = () => {
    setIsMenuOpen(!isMenuOpen);
    if (typeof document !== "undefined") {
      document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
    }
  };

  return (
    <>
      <div className="desktop">
        <div className="nav tw-container">
          <ul className="menu">
            <div className="logo">
              <li>
                <Link href="/" className="tw-text-[#607B96]">
                  Aadarsh Kushwaha
                </Link>
              </li>
            </div>
            <div className="menu-right">
              <li className="tw-mx-8 separator"></li>
              <li>
                <Link href="/" className={isActive("/") ? "active" : ""}>
                  _hello
                </Link>
              </li>
              <li className="tw-mx-8 separator"></li>
              <li>
                <Link href="/about" className={isActive("/about") ? "active" : ""}>
                  _about-me
                </Link>
              </li>
              <li className="tw-mx-8 separator"></li>
              <li>
                <Link href="/projects" className={isActive("/projects") ? "active" : ""}>
                  _projects
                </Link>
              </li>
              <li className="tw-mx-8 separator"></li>
            </div>
          </ul>
          <ul>
            <div className="menu-left tw-flex">
              <li className="tw-mx-8 separator"></li>
              <li>
                <Link href="/contact" className={isActive("/contact") ? "active" : ""}>
                  _contact-me
                </Link>
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
                <i className="ri-close-fill footer-icon mobile-nav-icon"></i>
              </li>
            ) : (
              <li className="icon" onClick={toogleIcon}>
                <i className="ri-menu-line footer-icon mobile-nav-icon"></i>
              </li>
            )}
          </ul>
          <hr className="def-hr" />
          {isMenuOpen && (
            <>
              <div className="mobile-nav-menu">
                <ul className="tw-flex tw-flex-col tw-text-center">
                  <li onClick={toogleIcon}>
                    <Link href="/" className={isActive("/") ? "active" : ""}>
                      _hello
                    </Link>
                  </li>
                  <hr className="def-hr" />
                  <li onClick={toogleIcon}>
                    <Link href="/about" className={isActive("/about") ? "active" : ""}>
                      _about-me
                    </Link>
                  </li>
                  <hr className="def-hr" />
                  <li onClick={toogleIcon}>
                    <Link href="/projects" className={isActive("/projects") ? "active" : ""}>
                      _projects
                    </Link>
                  </li>
                  <hr className="def-hr" />
                  <li onClick={toogleIcon}>
                    <Link href="/contact" className={isActive("/contact") ? "active" : ""}>
                      _contact
                    </Link>
                  </li>
                  <hr className="def-hr" />
                </ul>
              </div>
              <MobileFooter />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
