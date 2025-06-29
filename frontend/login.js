let captcha = document.querySelector(".form-captcha");

let captchaCode = Math.floor(Math.random() * 90000) + 10000;
console.log(captchaCode);
captcha.innerText = captchaCode;

// Username and Password fetching
const signup = async () => {
  const empId = document.getElementById("empId").value;
  const password = document.getElementById("password").value;
  const captcha = document.getElementById("captcha").value;

  if (captcha == captchaCode) {
    const res = await fetch("http://localhost:5000/etl/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: { empId, password } }),
    });
  }
  const data = await res.json();
  console.log(data);
};

document.getElementById("signup-btn").addEventListener("click", signup);
