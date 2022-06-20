import React from "react";
import '../css/Footer.css'

function Footer() {
    return (
    <footer className="footer block_pink">
        <div className="footer__newsletter">
            <label for="newsletter" className="footer__newsletter-label">Newsletter</label>
            <input type="email" id="newsletter" className="footer__newsletter-input" placeholder="Enter Your Email"/>
        </div>
        <div className="footer__bottom">
            <div className="footer__copyright">© 2022 Change.it Ltd. All Rights Reserved</div>
            <ul className="footer__link-list">
                <li className="footer__link"><a className="footer__link_real" href="#">Divorce</a></li>
                <li className="footer__link"><a className="footer__link_real" href="#">Privacy</a></li>
                <li className="footer__link"><a className="footer__link_real" href="#">Deed Poll Online</a></li>
                <li className="footer__link"><a className="footer__link_real" href="#">Terms</a></li>
                <li className="footer__link"><a className="footer__link_real" href="#">FAQ</a></li>
            </ul>
        </div>
    </footer>
    );
}

export default Footer