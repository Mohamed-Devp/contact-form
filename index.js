const form = document.querySelector('form');

function validateTextField(name, inputEl, parentElement) {
    const errorMsg = parentElement.querySelector('.error-msg');
    errorMsg.classList.remove('empty');

    inputEl.setAttribute('aria-invalid', "true");

    if (inputEl.validity.valueMissing) {
        errorMsg.textContent = `${name} is required`;
        return false;

    } else if (inputEl.validity.tooShort) {
        errorMsg.textContent = `${name} Must be at least ${inputEl.minLength} characters`;
        return false;
    }

    inputEl.removeAttribute('aria-invalid');

    errorMsg.classList.add('empty');
    errorMsg.textContent = '';
    return true;
}

function validateEmailField(inputEl, parentElement) {
    const errorMsg = parentElement.querySelector('.error-msg');
    errorMsg.classList.remove('empty');

    inputEl.setAttribute('aria-invalid', "true");

    if (inputEl.validity.valueMissing) {
        errorMsg.textContent = 'Email address is required';
        return false;

    } else if (!inputEl.validity.valid) {
        errorMsg.textContent = 'Please enter a valid email address';
        return false;
    }

    inputEl.removeAttribute('aria-invalid');

    errorMsg.classList.add('empty');
    errorMsg.textContent = '';
    return true;
}

function validateRequiredField(inputEl, parentElement, message) {
    const errorMsg = parentElement.querySelector('.error-msg');
    errorMsg.classList.remove('empty');

    inputEl.setAttribute('aria-invalid', "true");

    if (inputEl.validity.valueMissing) {
        errorMsg.textContent = message;
        return false;
    }

    inputEl.removeAttribute('aria-invalid');

    errorMsg.classList.add('empty');
    errorMsg.textContent = '';
    return true;
}

form.addEventListener('submit', (event) => {
    // Prevent the browser's native validation
    event.preventDefault();

    let valid = true;

    // Validate "input[type="text"]" and "textarea" fields
    const textFields = document.querySelectorAll('input[type="text"], textarea');

    const names = ['First name', 'Last name', 'Message'];

    textFields.forEach((textField, key) => {
        if (!validateTextField(names[key], textField, textField.parentElement)) {
            if (valid) {
                textField.focus();
                valid = false;
            }
        }
    });

    // Validate email address field
    const emailField = document.getElementById('email-address');

    if (!validateEmailField(emailField, emailField.parentElement)) {
        if (valid) {
            emailField.focus();
            valid = false;
        }
    }

    // Validate query type field
    const queryTypeField = document.querySelector('[name="query-type"]');
    const queryTypeParent = queryTypeField.closest('fieldset');
    const queryTypeMsg = 'Please select a query type';
    
    if (!validateRequiredField(queryTypeField, queryTypeParent, queryTypeMsg)) {
        if (valid) {
            queryTypeField.focus();
            valid = false;
        }
    }

    // Validate contact consent field
    const contactField = document.querySelector('[name="contact"]');
    const contactParent = contactField.closest('.contact-consent');
    const contactMsg = 'To submit this form, please consent to being contacted';

    if (!validateRequiredField(contactField, contactParent, contactMsg)) {
        if (valid) {
            contactField.focus();
            valid = false;
        }
    }

    if (valid) {
        alert("Form submitted successfully!");
    }
});