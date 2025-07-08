let captcha = document.querySelector(".form-captcha");

let captchaCode = Math.floor(Math.random() * 90000) + 10000;
console.log(captchaCode);
captcha.innerText = captchaCode;