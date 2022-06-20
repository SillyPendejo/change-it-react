import React from "react";
import '../css/Footer.css'

function Footer() {
    return (
    <footer class="footer block_pink">
        <div class="footer__newsletter">
            <label for="newsletter" class="footer__newsletter-label">Newsletter</label>
            <input type="email" id="newsletter" class="footer__newsletter-input" placeholder="Enter Your Email"/>
        </div>
        <div class="footer__bottom">
            <div class="footer__copyright">© 2022 Change.it Ltd. All Rights Reserved</div>
            <ul class="footer__link-list">
                <li class="footer__link"><a class="footer__link_real" href="#">Divorce</a></li>
                <li class="footer__link"><a class="footer__link_real" href="#">Privacy</a></li>
                <li class="footer__link"><a class="footer__link_real" href="#">Deed Poll Online</a></li>
                <li class="footer__link"><a class="footer__link_real" href="#">Terms</a></li>
                <li class="footer__link"><a class="footer__link_real" href="#">FAQ</a></li>
            </ul>
        </div>
    </footer>
    );
}

export default Footer