const form = document.querySelector(".form");

const fields = document.querySelectorAll(".field");
const queryTypeRadio = document.querySelector(".radio_name_query-type");
const consentCheckbox = document.querySelector(".checkbox_name_consent");

const options = document.querySelectorAll(".option");

const alertBox = document.querySelector(".alert");
const statusBox = document.querySelector(".status");

const toast = document.querySelector(".toast");

let selectedOption;

function showError(inp, msg) {
    const error = document.querySelector(
        `#${inp.getAttribute("aria-describedby")}`
    );

    error.textContent = msg;
    if (!error.classList.contains("error_active")) {
        error.classList.add("error_active");
    }
}

function hideError(inp) {
    const error = document.querySelector(
        `#${inp.getAttribute("aria-describedby")}`
    );

    error.textContent = "";
    error.classList.remove("error_active");
}

function showStatus() {
    statusBox.textContent = "Message sent! Thanks for completing the form. We'll be in touch soon!";
    
    toast.classList.add("toast_active");

    setTimeout(() => {
        statusBox.textContent = "";

        toast.classList.remove("toast_fade_in");
        toast.classList.add("toast_fade_out");

        setTimeout(() => {
            toast.classList.remove("toast_active");

            toast.classList.remove("toast_fade_out");
            toast.classList.add("toast_fade_in");
        }, 300);
    }, 5000);
}

fields.forEach(field => {
    field.addEventListener("invalid", () => {
        const label = field.getAttribute("data-label");

        field.classList.add("field_invalid");

        let alertMsg, errorMsg;

        if (field.validity.valueMissing) {
            alertMsg = `${label} is required`;
            errorMsg = "This field is required";
        }
        else if (field.validity.typeMismtach) {
            alertMsg = `${label} is invalid`;
            errorMsg = `Please enter a valid ${label.toLowerCase()}`;
        }
        else if (field.validity.tooShort) {
            alertMsg = `${label} must be at least ${field.minLength} characters long`;
            errorMsg = `Must be at least ${field.minLength} characters long`;
        }

        if (alertBox.textContent === "") {
            alertBox.textContent = alertMsg;
        }

        showError(field, errorMsg);
    });
});

queryTypeRadio.addEventListener("invalid", () => {
    showError(queryTypeRadio, "Please select a query type");
});

consentCheckbox.addEventListener("invalid", () => {
    showError(consentCheckbox, "To submit this form, please consent to being contacted");
});

form.addEventListener("submit", event => {
    event.preventDefault();

    // Reset the error messages before validation

    alertBox.textContent = "";

    fields.forEach(field => {
        field.classList.remove("field_invalid");

        hideError(field);
    });

    hideError(queryTypeRadio);
    hideError(consentCheckbox);

    // Validate the form

    if (form.checkValidity()) {
        form.reset();
        showStatus();
    }
});

form.addEventListener("reset", () => {
    options.forEach(option => {
        const radio = option.firstElementChild;
        
        if (radio.getAttribute("checked") !== "") {
            option.classList.remove("option_selected");
        }
    });
});

options.forEach(option => {
    const radio = option.firstElementChild;

    if (radio.checked) {
        option.classList.add("option_selected");
        selectedOption = option;
    }

    radio.addEventListener("change", () => {
        if (selectedOption) {
            selectedOption.classList.remove("option_selected");
        }

        option.classList.add("option_selected");
        selectedOption = option;
    });
});