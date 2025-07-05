const captchaCode = Math.floor(Math.random() * 90000) + 10000;
document.querySelector(".form-captcha").innerText = captchaCode;

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const empId = document.getElementById("empId").value.trim();
  const password = document.getElementById("password").value.trim();
  const captchaInput = document.getElementById("captcha").value.trim();

  if (captchaInput !== captchaCode.toString()) {
    alert("Captcha is incorrect!");
    return;
  }

  try {
    const res = await fetch("/etl/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: { emp_id: empId, password: password } }),
    });

    if (res.redirected) {
      window.location.href = res.url;
    } 
    else {
      const data = await res.json();
      alert(data.message || "Login failed");
    }
  } 
  
  catch (err) {
    console.error("Error during login:", err);
    alert("Server error. Try again later.");
  }
});
