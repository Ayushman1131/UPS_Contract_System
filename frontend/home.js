window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/etl/user/session", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();

    const welcomeBox = document.querySelector(".navbar-bottom");
    if (welcomeBox) {
      welcomeBox.textContent = `Welcome, ${user.name}`;
    }

    // Turn on the features based on user role
    let compReport = document.querySelector(".complaint-report-section");
    let complForm = document.querySelector(".complaint-form-section");
    let pmBill = document.querySelector(".pm-bill-section");
    let pmForm = document.querySelector(".pm-form-section");
    let compInbox = document.querySelector(".complaint-inbox-section");
    let pmApproval= document.querySelector(".pm-approval-section");
    let pmVerification = document.querySelector(".pm-verification-section");

    if (user.role === "CSE") {
      complForm.style.display = "none";
      pmBill.style.display = "none";
      compReport.style.display = "none";
      pmApproval.style.display = "none";
      pmVerification.style.display = "none";
    }

    if (user.role === "EIC" || (user.role === "CC" )) {
      pmForm.style.display = "none";
      compInbox.style.display = "none";
      pmApproval.style.display = "none";
      pmVerification.style.display = "none";
    }

    if (user.role == "ESI") {
      pmBill.style.display = "none";
      compInbox.style.display = "none";
      pmVerification.style.display = "none";
      pmForm.style.display = "none";
    }

    if (user.role === "ESC"){
      pmBill.style.display = "none";
      compInbox.style.display = "none";
      pmApproval.style.display = "none";
      pmForm.style.display = "none";
    }

    const complaintFormLink = document.getElementById("complaint-form-link");
    if (complaintFormLink) {
      complaintFormLink.href = `/etl/user/${user.emp_id}/home/complaint/form`;
    }

    const pmFormLink = document.getElementById("pm-link");
    if (pmFormLink) {
      pmFormLink.href = `/etl/user/${user.emp_id}/home/maintenance/form`;
    }

    const pmReportLink = document.getElementById("pm-report-link");
    if (pmReportLink) {
      pmReportLink.href = `/etl/user/${user.emp_id}/home/maintenance/reports`;
    }

    const complaintReportLink = document.getElementById("complaint-report-link");
    if (complaintReportLink) {
      complaintReportLink.href = `/etl/user/${user.emp_id}/home/complaint/reports`;
    }
    
    const pmBillLink = document.getElementById("pm-bill-link");
    if (pmBillLink) {
      pmBillLink.href = `/etl/user/${user.emp_id}/home/maintenance/bill`;
    }

    const pmApprovalLink = document.getElementById("pm-approval-link");
    if (pmApprovalLink) {
      pmApprovalLink.href = `/etl/user/${user.emp_id}/home/maintenance/approval`;
    }

    const pmVerificationLink = document.getElementById("pm-verification-link");
    if (pmVerificationLink) {
      pmVerificationLink.href = `/etl/user/${user.emp_id}/home/maintenance/verification`;
    }

    const compInboxLink = document.getElementById("complaint-inbox-link");
    if (compInboxLink) {
      compInboxLink.href = `/etl/user/${user.emp_id}/home/complaint/inbox`;
    }

    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.href = `/etl/user/${user.emp_id}/home/logout`;
    }

  } catch (err) {
    console.log(err);
    alert("Please log in first.");
    window.location.href = "/"; // Redirect to login page
  }
});
