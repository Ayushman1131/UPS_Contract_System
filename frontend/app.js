const showPopupBtn = document.querySelector('#login-btn');
const formPopup = document.querySelector('.form-popup');
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSignupLink = document.querySelectorAll(".form-content .bottom-link a");
const loginForm = document.querySelector('#login-form');
const loginStatus = document.querySelector('#login-status');

showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});
hidePopupBtn.addEventListener("click", () => {
    document.body.classList.remove("show-popup");
});
loginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    });
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

    } catch (err) {
        loginStatus.style.color = 'red';
        loginStatus.textContent = 'Something went wrong. Try again.';
    }
});
