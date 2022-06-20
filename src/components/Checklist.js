import React from "react";
import '../css/Checklist.css'

function Checklist() {
    return (
    <div class="checklist" id="checklist">
        <div class="checklist__ad block block_lime">Get your free Change.it checklist</div>
        <div class="checklist__form block block_white">
            <form class="checklist__form_element">
                <label class="checklist__label" for="name">First Name</label>
                <input class="checklist__input" type="text" name="name" id="name" placeholder="Enter Your First Name"/>
                <label class="checklist__label" for="lastname">Last Name</label>
                <input class="checklist__input" type="text" name="lastname" id="lastname" placeholder="Enter Your Last Name"/>
                <label class="checklist__label" for="email">Email</label>
                <input class="checklist__input" type="text" name="email" id="email" placeholder="Enter Your Email"/>
                <label class="checklist__label" for="event">Life Event</label>
                <select class="checklist__select" name="event" id="event">
                    <option class="checklist__option" value="" disabled selected>Select Life Event</option>
                    <option class="checklist__option">Marriage</option>
                    <option class="checklist__option">Divorce</option>
                    <option class="checklist__option">Marriage again</option>
                    <option class="checklist__option">Divorce 2: Electric Boogaloo</option>
                </select>
                <label class="checklist__label" for="date">Life Event Date</label>
                <input class="checklist__input checklist__input_date" type="text" name="date" id="date" placeholder="DD/MM/YYYY" onfocus="(this.type='date')"/>
            <span class="checklist__policy">By submitting your details you agree with our <a class="checklist__policy_link" href="#">Privacy Policy</a>.</span>
            <button class="checklist__button button" type="submit">Download</button>
            </form>
        </div>
    </div>
    );
}

export default Checklist