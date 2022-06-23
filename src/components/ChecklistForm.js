import React, { useState, useEffect } from "react";

function ChecklistForm() {
  function isValidText(inputText, pattern) {
    if (inputText === "") return true;
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

  const [errorList, setErrorList] = useState({
    firstName: "",
    lastName: "",
    email: "",
    event: "",
    date: "",
  });

  const [firstName, setFirstName] = useState("");
  const handleChangeFistName = ({ target }) => {
    setFirstName(target.value);
  };
  const handleFocusFirstName = () => {
    setErrorList((prevList) => ({ ...prevList, firstName: "" }));
  };
  useEffect(() => {
    if (!isValidText(firstName, /^[A-Z][a-z]+$/)) {
      setErrorList((prevList) => ({
        ...prevList,
        firstName: nameErrorText(firstName, "name"),
      }));
    } else {
      setErrorList((prevList) => ({ ...prevList, firstName: "" }));
    }
  }, [firstName]);

  const [lastName, setLastName] = useState("");
  const handleChangeLastName = ({ target }) => {
    setLastName(target.value);
  };
  const handleFocusLastName = () => {
    setErrorList((prevList) => ({ ...prevList, lastName: "" }));
  };
  useEffect(() => {
    if (!isValidText(lastName, /^[A-Z][a-z]+$/)) {
      setErrorList((prevList) => ({
        ...prevList,
        lastName: nameErrorText(lastName, "name"),
      }));
    } else {
      setErrorList((prevList) => ({ ...prevList, lastName: "" }));
    }
  }, [lastName]);

  const [email, setEmail] = useState("");
  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };
  const handleFocusEmail = () => {
    setErrorList((prevList) => ({ ...prevList, email: "" }));
  };
  useEffect(() => {
    if (
      !isValidText(
        email,
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setErrorList((prevList) => ({
        ...prevList,
        email: "Enter a valid email address",
      }));
    } else {
      setErrorList((prevList) => ({ ...prevList, email: "" }));
    }
  }, [email]);

  const options = [
    "Marriage",
    "Divorce",
    "Marriage again",
    "Divorce 2: Electric Boogaloo",
  ];
  const eventOptions = options.map((option) => (
    <option className="checklist__option" value={option} key={option}>
      {option}
    </option>
  ));
  const [event, setEvent] = useState("");
  const handleChangeEvent = ({ target }) => {
    setEvent(target.value);
  };
  const handleFocusEvent = ({ target }) => {
    setErrorList((prevList) => ({
      ...prevList,
      event: "",
    }));
  };

  function isValidDate(inputDate) {
    const now = Date.now();

    if (inputDate === "") return true;

    const inputDateNumber = Date.parse(inputDate);
    return inputDateNumber < now;
  }
  const [date, setDate] = useState("");
  const handleChangeDate = ({ target }) => {
    setDate(target.value);
  };
  useEffect(() => {
    if (!isValidDate(date)) {
      setErrorList((prevList) => ({
        ...prevList,
        date: "Date can't be later than today",
      }));
    } else {
      setErrorList((prevList) => ({ ...prevList, date: "" }));
    }
  }, [date]);

  const handleSubmit = (e) => {
    const stateList = [firstName, lastName, email, event, date];
    const stateNames = Object.keys(errorList);

    e.preventDefault();

    let isInputEmpty = false;
    stateList.forEach((inputState, index) => {
      if (inputState === "") {
        isInputEmpty = true;
        setErrorList((prevList) => ({
          ...prevList,
          [stateNames[index]]: "Required field",
        }));
      }
    });

    if (isInputEmpty) return;

    let isFormValid = true;
    Object.values(errorList).forEach((inputErrorText) => {
      if (inputErrorText !== "") isFormValid = false;
    });
    if (!isFormValid) return;

    stateList.forEach((inputState, index) =>
      console.log(`${stateNames[index]}: ${inputState}`)
    );
  };

  return (
    <form className="checklist__form_element" onSubmit={handleSubmit}>
      <label className="checklist__label" htmlFor="name">
        First Name
      </label>
      <input
        className={
          errorList.firstName === ""
            ? "checklist__input"
            : "checklist__input checklist__error"
        }
        onChange={handleChangeFistName}
        onFocus={handleFocusFirstName}
        value={firstName}
        type="text"
        name="name"
        id="name"
        placeholder="Enter Your First Name"
      />
      {errorList.firstName !== "" && (
        <div className="checklist__error_msg">{errorList.firstName}</div>
      )}
      <label className="checklist__label" htmlFor="lastname">
        Last Name
      </label>
      <input
        className={
          errorList.lastName === ""
            ? "checklist__input"
            : "checklist__input checklist__error"
        }
        onChange={handleChangeLastName}
        onFocus={handleFocusLastName}
        value={lastName}
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Enter Your Last Name"
      />
      {errorList.lastName !== "" && (
        <div className="checklist__error_msg">{errorList.lastName}</div>
      )}
      <label className="checklist__label" htmlFor="email">
        Email
      </label>
      <input
        className={
          errorList.email === ""
            ? "checklist__input"
            : "checklist__input checklist__error"
        }
        onChange={handleChangeEmail}
        onFocus={handleFocusEmail}
        value={email}
        type="text"
        name="email"
        id="email"
        placeholder="Enter Your Email"
      />
      {errorList.email !== "" && (
        <div className="checklist__error_msg">{errorList.email}</div>
      )}
      <label className="checklist__label" htmlFor="event">
        Life Event
      </label>
      <select
        className={
          errorList.event === ""
            ? "checklist__select"
            : "checklist__select checklist__error"
        }
        onInput={handleChangeEvent}
        onFocus={handleFocusEvent}
        defaultValue={"Select Life Event"}
        name="event"
        id="event"
      >
        <option disabled={true}>Select Life Event</option>
        {eventOptions}
      </select>
      {errorList.event !== "" && (
        <div className="checklist__error_msg">{errorList.event}</div>
      )}
      <label className="checklist__label" htmlFor="date">
        Life Event Date
      </label>
      <input
        className={
          errorList.date === ""
            ? "checklist__input"
            : "checklist__input checklist__error"
        }
        onChange={handleChangeDate}
        value={date}
        type="date"
        name="date"
        id="date"
      />
      {errorList.date !== "" && (
        <div className="checklist__error_msg">{errorList.date}</div>
      )}
      <span className="checklist__policy">
        By submitting your details you agree with our{" "}
        <a className="checklist__policy_link" href="#">
          Privacy Policy
        </a>
        .
      </span>
      <button className="checklist__button button" type="submit">
        Download
      </button>
    </form>
  );
}

export default ChecklistForm;
