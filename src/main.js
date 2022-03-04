function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function onCreateAccount() {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    const email = document.querySelector("#email").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#create-account-password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;

    if (password !== confirmPassword) {
        // alert('Password are different');
        setFormMessage(createAccountForm, "error", "Couldn't create an account, check password please!");

    } else {
        const form = {
            email,
            username,
            password,
        };

        const formStringified = JSON.stringify(form);

        localStorage.setItem('user', formStringified);

        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    }

}

function onLoginUser() {

    const user = localStorage.getItem('user');
    const userParsed = JSON.parse(user);

    const usernameOrEmailInputValue = document.querySelector('#username-or-email').value;
    const passwordInputValue = document.querySelector('#password').value;

    console.log({
        usernameOrEmailInputValue,
        passwordInputValue
    });

    if (userParsed.username !== usernameOrEmailInputValue && userParsed.email !== usernameOrEmailInputValue) {
        alert("wrong username or email");
    } else if (userParsed.password !== passwordInputValue) {
        alert("wrong username or email");
    } else {
        alert('You have been logged successfuly!Go fuck yourself')
    }



}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    // loginForm.addEventListener("submit", e => {
    //     e.preventDefault();

    //     setFormMessage(loginForm, "error", "Invalid username or password");
    // });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});