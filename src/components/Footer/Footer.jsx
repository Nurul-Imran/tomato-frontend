import React from 'react';

import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="container">
                <div className="footer_wrapper">
                    <div className="footer_left">
                        <div className="footer_logo">
                            <img src={assets.logo} alt="Footer Logo" />
                        </div>
                        <p className="footer_desc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore reprehenderit, nulla, odit rem, fugiat unde aliquid et doloribus quis cum ipsa nobis nisi non iusto esse quas velit consequatur. Porro blanditiis iste quasi corporis iure.
                        </p>
                        <div className="footer_social_list">
                            <a href="#"><img src={assets.facebook_icon} alt="Facebook Icon" /></a>
                            <a href="#"><img src={assets.twitter_icon} alt="Twitter Icon" /></a>
                            <a href="#"><img src={assets.linkedin_icon} alt="LinkedIn Icon" /></a>
                        </div>
                    </div>
                    <div className="footer_center">
                        <h4>
                            COMPANY
                        </h4>
                        <ul className='footer_menu'>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div className="footer_right">
                        <h4>GET IN TOUCH</h4>
                        <ul className="footer_menu">
                            <li>+1-212-4585-9586</li>
                            <li>coderWorld@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className="footer_copyright">
                    <p>Copyright 2024 c Tomato.com - All Right Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer