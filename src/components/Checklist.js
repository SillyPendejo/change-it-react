import React from "react";
import '../css/Checklist.css'

function Checklist() {
    const options = ["Marriage", "Divorce", "Marriage again", "Divorce 2: Electric Boogaloo"];
    const selectOptions = options.map( (option) =>
        <option className="checklist__option" value={option}>{option}</option>);
    return (
    <div className="checklist__container" id="checklist">
        <div className="checklist__ad block block_lime">Get your free Change.it checklist</div>
        <div className="checklist__form block block_white">
            <form className="checklist__form_element">
                <label className="checklist__label" for="name">First Name</label>
                <input className="checklist__input" type="text" name="name" id="name" placeholder="Enter Your First Name"/>
                <label className="checklist__label" for="lastname">Last Name</label>
                <input className="checklist__input" type="text" name="lastname" id="lastname" placeholder="Enter Your Last Name"/>
                <label className="checklist__label" for="email">Email</label>
                <input className="checklist__input" type="text" name="email" id="email" placeholder="Enter Your Email"/>
                <label className="checklist__label" for="event">Life Event</label>
                <select className="checklist__select" name="event" id="event">
                    {selectOptions}
                </select>
                <label className="checklist__label" for="date">Life Event Date</label>
                <input className="checklist__input checklist__input_date" type="text" name="date" id="date" placeholder="DD/MM/YYYY" onfocus="(this.type='date')"/>
            <span className="checklist__policy">By submitting your details you agree with our <a className="checklist__policy_link" href="#">Privacy Policy</a>.</span>
            <button className="checklist__button button" type="submit">Download</button>
            </form>
        </div>
    </div>
    );
}

export default Checklist