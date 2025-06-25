const showPopupBtn = document.querySelector('#login-btn');
const formPopup = document.querySelector('.form-popup');
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSignupLink = document.querySelectorAll(".form-content .bottom-link a");


showPopupBtn.addEventListener("click", function () {
    document.body.classList.toggle("show-popup");
    
});
hidePopupBtn.addEventListener("click", function () {
    console.log("clicked");
    document.body.classList.remove("show-popup");
});

loginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    })
});
