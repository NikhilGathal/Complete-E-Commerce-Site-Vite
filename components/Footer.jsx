import React from 'react';
import './footer.css'; // You will style it in this CSS file
import shop from '../assets/Sho.jpg'
import { Link } from 'react-router-dom';
const Footer = ({dark}) => {
  return (
    <footer className={`footer ${dark ? 'dark' : ''}`}>
      <div className="footer-left">
        <div className="footer-brand">
          <img src={shop} alt="Logo" className="footer-logo" />
 <a href="#">  <button  className="download-btn">Download App</button> </a>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">Gift cards</a></li>
            <li><a href="#">Registry</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Blog</a></li>
           
          </ul>
        </div>

        <div className="footer-column">
          <h4>Sell</h4>
          <ul>
            <li><a href="#">Sell on OurSite</a></li>
            <li><a href="#">Teams</a></li>
            <li><a href="#">Forums</a></li>
            <li><a href="#">Affiliates & Creators</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li><a href="#">Our Company</a></li>
            <li><a href="#">Policies</a></li>
            <li><a href="#">Investors</a></li>
            <li><a href="#">Careers</a></li>
          
            <li><a href="#">Impact</a></li>
          </ul>
        </div>

        <div className="footer-column help">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Settings</a></li>
          </ul>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            {/* <a href="#"><i className="fab fa-pinterest"></i></a> */}
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
