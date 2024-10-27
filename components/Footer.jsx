import React from 'react';
import './footer.css'; // You will style it in this CSS file
import shop from '../assets/Sho.jpg'
const Footer = ({dark}) => {
  return (
    <footer className={`footer ${dark ? 'dark' : ''}`}>
      <div className="footer-left">
        <div className="footer-brand">
          <img src={shop} alt="Logo" className="footer-logo" />
          <button className="download-btn">Download App</button>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li><a href="/gift-cards">Gift cards</a></li>
            <li><a href="/registry">Registry</a></li>
            <li><a href="/sitemap">Sitemap</a></li>
            <li><a href="/blog">Blog</a></li>
           
          </ul>
        </div>

        <div className="footer-column">
          <h4>Sell</h4>
          <ul>
            <li><a href="/sell">Sell on OurSite</a></li>
            <li><a href="/teams">Teams</a></li>
            <li><a href="/forums">Forums</a></li>
            <li><a href="/affiliates">Affiliates & Creators</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li><a href="/company">Our Company</a></li>
            <li><a href="/policies">Policies</a></li>
            <li><a href="/investors">Investors</a></li>
            <li><a href="/careers">Careers</a></li>
          
            <li><a href="/impact">Impact</a></li>
          </ul>
        </div>

        <div className="footer-column help">
          <h4>Help</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/privacy">Privacy Settings</a></li>
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
