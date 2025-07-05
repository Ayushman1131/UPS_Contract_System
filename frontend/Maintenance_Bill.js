document.addEventListener("DOMContentLoaded", function () {
  // Handle Approve button
  document.querySelectorAll(".approve-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const container = btn.closest(".action-buttons");
      container.innerHTML = '<span class="text-success fw-bold">PM Verified!</span>';
    });
  });

  // Handle Reject button
  document.querySelectorAll(".reject-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const container = btn.closest(".action-buttons");
      container.innerHTML = '<span class="text-danger fw-bold">PM Rejected!</span>';
    });
  });
});

// Append list 
document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/pm-reports')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("pm-approval-container");

      data.forEach(pm => {
        const row = document.createElement("div");
        row.className = "row border-bottom py-2 align-items-center";
        row.innerHTML = `
          <div class="col-md-6">
            <i class="fa-solid fa-file-lines text-primary me-2"></i>
            ${pm.assetNumber} – ${pm.description || "No description"}
          </div>
          <div class="col-md-3 text-muted">${new Date(pm.date).toLocaleDateString()}</div>
          <div class="col-md-3">
            <span class="action-buttons">
              <button class="btn btn-success approve-btn" data-id="${pm._id}">Approve</button>
              <button class="btn btn-danger reject-btn" data-id="${pm._id}">Reject</button>
            </span>
          </div>
        `;
        container.appendChild(row);
      });
    });
});


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("approve-btn")) {
    const container = e.target.closest(".action-buttons");
    container.innerHTML = `<span class="text-primary fw-bold">PM Approved</span>`;
  }

  if (e.target.classList.contains("reject-btn")) {
    const container = e.target.closest(".action-buttons");
    container.innerHTML = `<span class="text-danger fw-bold">PM Rejected</span>`;
  }
});

