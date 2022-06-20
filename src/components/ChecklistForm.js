import React, { useState, useEffect } from "react";

function ChecklistForm() {
    const options = ["Marriage", "Divorce", "Marriage again", "Divorce 2: Electric Boogaloo"];
    const selectOptions = options.map( (option) =>
        <option className="checklist__option" value={option} key={option}>{option}</option>);
        
    function isValidText(inputText, pattern) {
        if (inputText === '') return true;
        return pattern.test(inputText);
    }

    function nameErrorText(input, inputName) {
        if (!input) return `Empty ${inputName}`;
        if (isValidText(input, / /)) {
          return `Your ${inputName} can't have spaces`;
        }
        if (!isValidText(input, /^[a-zA-Z]+$/)) {
          return `Your ${inputName} can only have letters of the alphabet`;
        }
        if (!isValidText(input, /^[A-Z]/)) {
          return `Your ${inputName} should start with a capital letter`;
        }
        if (isValidText(input, /^[A-Z]{2,}/)) {
          return `Your ${inputName} should start with only 1 capital letter`;
        }
        if (isValidText(input, /^[A-Z]$/)) {
          return `Your ${inputName} needs to have at least 2 characters`;
        }
        if (isValidText(input, /^[a-zA-Z]+$/)) {
          return `Your ${inputName} has more than 1 capital letter`;
        }
    }
    
    const [ errorList, setErrorList ] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [ firstName, setFirstName ] = useState( '' );
    const handleChangeFistName = ({ target }) => {
        setFirstName( target.value )
    }
    const handleFocusFirstName = e => {
        setErrorList( prevList => ({ ...prevList, firstName: "" }) );
    }
    useEffect( () => {
        if (!isValidText(firstName, /^[A-Z][a-z]+$/)) {
            setErrorList( prevList => ({ ...prevList, firstName:  nameErrorText(firstName, "name")}) )
        } else {
            setErrorList( prevList => ({ ...prevList, firstName: "" }) )
        }        
    }, [firstName])

    const [ lastName, setLastName ] = useState( '' );
    const handleChangeLastName = ({ target }) => {
        setLastName( target.value )
    }
    const handleFocusLastName = e => {
        setErrorList( prevList => ({ ...prevList, lastName: "" }) );
    }
    useEffect( () => {
        if (!isValidText(lastName, /^[A-Z][a-z]+$/)) {
            setErrorList( prevList => ({ ...prevList, lastName:  nameErrorText(lastName, "name")}) )
        } else {
            setErrorList( prevList => ({ ...prevList, lastName: "" }) )
        }
    }, [lastName])

    const [ email, setEmail ] = useState( '' );
    const handleChangeEmail = ({ target }) => {
        setEmail( target.value )
    }
    const handleFocusEmail = e => {
        setErrorList( prevList => ({ ...prevList, email: "" }) );
    }
    useEffect( () => {
        if (!isValidText(email, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setErrorList( prevList => ({ ...prevList, email: "Enter a valid email address" }) )
        } else {
            setErrorList( prevList => ({ ...prevList, email: "" }) )
        }
    }, [email])


    function isValidDate(input) {
        const now = Date.now();

        if (!input.value) return false;
        
        input = Date.parse(input.value);
        return input < now;
    }

    useEffect( () => {
        console.log(errorList);
    }, [errorList])

    return (
    <form className="checklist__form_element">
        <label className="checklist__label" htmlFor="name">First Name</label>
        <input className={ errorList.firstName ===  '' ? "checklist__input" : "checklist__input checklist__error"} onChange={handleChangeFistName} onFocus={handleFocusFirstName} value ={firstName} type="text" name="name" id="name" placeholder="Enter Your First Name"/>
        { errorList.firstName !==  '' && <div className="checklist__error_msg">{errorList.firstName}</div> }
        <label className="checklist__label" htmlFor="lastname">Last Name</label>
        <input className={ errorList.lastName ===  '' ? "checklist__input" : "checklist__input checklist__error"} onChange={handleChangeLastName} onFocus={handleFocusLastName} value={lastName} type="text" name="lastname" id="lastname" placeholder="Enter Your Last Name"/>
        { errorList.lastName !==  '' && <div className="checklist__error_msg">{errorList.lastName}</div> }
        <label className="checklist__label" htmlFor="email">Email</label>
        <input className={ errorList.email ===  '' ? "checklist__input" : "checklist__input checklist__error"} onChange={handleChangeEmail} onFocus={handleFocusEmail} value={email} type="text" name="email" id="email" placeholder="Enter Your Email"/>
        { errorList.email !==  '' && <div className="checklist__error_msg">{errorList.email}</div> }
        <label className="checklist__label" htmlFor="event">Life Event</label>
        <select className="checklist__select" name="event" id="event">
            {selectOptions}
        </select>
        <label className="checklist__label" htmlFor="date">Life Event Date</label>
        <input className="checklist__input checklist__input_date" type="date" name="date" id="date" placeholder="DD/MM/YYYY"/>
    <span className="checklist__policy">By submitting your details you agree with our <a className="checklist__policy_link" href="#">Privacy Policy</a>.</span>
    <button className="checklist__button button" type="submit">Download</button>
    </form>
    );
}

export default ChecklistForm