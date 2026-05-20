const contactForm = document.querySelector(".contact-form");

const firstNameInp = document.querySelector("#first-name");
const firstNameErrorOut = document.querySelector("#first-name-error");

const lastNameInp = document.querySelector("#last-name");
const lastNameErrorOut = document.querySelector("#last-name-error");

const emailInp = document.querySelector("#email");
const emailErrorOut = document.querySelector("#email-error");

const queryTypeInps = document.querySelectorAll('input[name="query-type"]');
const queryTypeErrorOut = document.querySelector("#query-type-error");

const messageInp = document.querySelector("#message");
const messageErrorOut = document.querySelector("#message-error");

const consentInp = document.querySelector("#consent");
const consentErrorOut = document.querySelector("#consent-error");

firstNameInp.addEventListener("input", () => {
    validateTextField(firstNameInp, firstNameErrorOut);
});

firstNameInp.addEventListener("invalid", () => {
    validateTextField(firstNameInp, firstNameErrorOut);
});

lastNameInp.addEventListener("input", () => {
    validateTextField(lastNameInp, lastNameErrorOut);
});

lastNameInp.addEventListener("invalid", () => {
    validateTextField(lastNameInp, lastNameErrorOut);
});

emailInp.addEventListener("input", validateEmailAddress);

emailInp.addEventListener("invalid", validateEmailAddress);

queryTypeInps.forEach(queryTypeInp => {
    queryTypeInp.addEventListener("change", () => {
        if (queryTypeInp.checked) {
            hideError(queryTypeInps[0], queryTypeErrorOut);
        }
    });
});

queryTypeInps[0].addEventListener("invalid", validateQueryType);

messageInp.addEventListener("input", () => {
    validateTextField(messageInp, messageErrorOut);
});

messageInp.addEventListener("invalid", () => {
    validateTextField(messageInp, messageErrorOut);
});

consentInp.addEventListener("change", validateConsent);

consentInp.addEventListener("invalid", validateConsent);

contactForm.addEventListener("submit", (event) => {
    if (!contactForm.checkValidity()) {
        event.preventDefault();
    }
});

function showError(inp, errorOut, message) {
    inp.classList.add("is-invalid");
    errorOut.classList.add("is-active");
    errorOut.textContent = message;
}

function hideError(inp, errorOut) {
    inp.classList.remove("is-invalid");
    errorOut.classList.remove("is-active");
}

function validateTextField(inp, errorOut) {
    if (inp.validity.valueMissing) {
        showError(inp, errorOut, "This field is required");
    }
    else {
        hideError(inp, errorOut);
    }
}

function validateEmailAddress() {
    if (emailInp.validity.valueMissing) {
        showError(emailInp, emailErrorOut, "This field is required");
    }
    else if (emailInp.validity.typeMismatch) {
        showError(emailInp, emailErrorOut, "Please enter a valid email address");
    }
    else {
        hideError(emailInp, emailErrorOut);
    }
}

function validateQueryType() {
    const firstQueryTypeInp = queryTypeInps[0];

    if (firstQueryTypeInp.validity.valid) {
        hideError(firstQueryTypeInp, queryTypeErrorOut);
    }
    else {
        showError(firstQueryTypeInp, queryTypeErrorOut, "Please select a query type");
    }
}

function validateConsent() {
    if (consentInp.validity.valid) {
        hideError(consentInp, consentErrorOut);
    }
    else {
        showError(
            consentInp, consentErrorOut, "To submit this form, please consent to being contated"
        );
    }
}