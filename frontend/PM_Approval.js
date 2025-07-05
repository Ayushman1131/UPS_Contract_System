window.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch session
    const res = await fetch("/etl/user/session", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const user = await res.json();
    window.empId = user.emp_id;

    console.log("User session loaded:", user);

    const container = document.getElementById('pm-approval-container');

    // Fetch verified maintenance records
    const recordsRes = await fetch(`/etl/user/${window.empId}/home/maintenance/verified`);
    const data = await recordsRes.json();

    if (typeof data === 'string') {
      container.innerHTML = `<div class="text-danger">${data}</div>`;
      return;
    }

    data.forEach((record, index) => {
      const row = document.createElement('div');
      row.className = 'row align-items-center py-2 border-bottom';

      const date = new Date(record.pm_date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });

      row.innerHTML = `
        <div class="col-md-6">
          <a href="#" class="open-modal text-decoration-none text-primary"
             data-bs-toggle="modal"
             data-bs-target="#helloModal"
             data-index="${index}"
             data-pm-id="${record.pm_id}">
            <i class="bi bi-file-earmark-text me-2"></i>
            ${record.pm_id}
          </a>
        </div>
        <div class="col-md-3 text-muted">${date}</div>
        <div class="col-md-3 text-muted action-btns">
          <button class="btn btn-success approve-btn me-1" data-id="${record._id}">Approve</button>
          <button class="btn btn-danger reject-btn" data-id="${record._id}">Reject</button>
        </div>
      `;

      container.appendChild(row);
    });

    // Modal content
    document.querySelectorAll('.open-modal').forEach(link => {
      link.addEventListener('click', e => {
        const index = e.currentTarget.getAttribute('data-index');
        const record = data[index];
        const modalContent = document.getElementById('modalContent');

        const checklist = record.checklist
          ? Object.entries(record.checklist).map(([k, v]) => `<li>${k}: <b>${v ? '✅' : '❌'}</b></li>`).join('')
          : `<li>No checklist available</li>`;

        const readings = record.readings
          ? Object.entries(record.readings).map(([k, v]) => `<li>${k}: <b>${v}</b></li>`).join('')
          : `<li>No readings available</li>`;

        modalContent.innerHTML = `
          <h5 class="mb-3">Preventive Maintenance Details</h5>
          <p><strong>PM ID:</strong> ${record.pm_id}</p>
          <p><strong>Zone:</strong> ${record.zone}</p>
          <p><strong>Location:</strong> ${record.location}</p>
          <p><strong>PM Date:</strong> ${new Date(record.pm_date).toLocaleDateString()}</p>
          <p><strong>Done By:</strong> ${record.pm_done_by}</p>
          <p><strong>Quarter:</strong> ${record.quarter}</p>
          <p><strong>Remarks:</strong> ${record.remarks || 'None'}</p>
          <hr>
          <h6>Checklist</h6>
          <ul>${checklist}</ul>
          <h6>Readings</h6>
          <ul>${readings}</ul>
        `;
      });
    });

    // Approve button
    document.querySelectorAll('.approve-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const row = e.target.closest('.row');
        const pmId = row.querySelector('.open-modal').dataset.pmId;

        const res = await fetch('/etl/user/maintenance/update-status', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pm_id: pmId, approved: true })
        });

        const msg = await res.text();
        alert(msg);

        row.querySelector('.action-btns').innerHTML = `<span class="badge bg-success">Approved</span>`;
      });
    });

    // Reject button
    document.querySelectorAll('.reject-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const row = e.target.closest('.row');
        const pmId = row.querySelector('.open-modal').dataset.pmId;

        const res = await fetch(window.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch session
    const res = await fetch("/etl/user/session", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const user = await res.json();
    window.empId = user.emp_id;

    console.log("User session loaded:", user);

    const container = document.getElementById('pm-approval-container');

    // Fetch verified maintenance records
    const recordsRes = await fetch(`/etl/user/${window.empId}/home/maintenance/verified`);
    const data = await recordsRes.json();

    if (typeof data === 'string') {
      container.innerHTML = `<div class="text-danger">${data}</div>`;
      return;
    }

    data.forEach((record, index) => {
      const row = document.createElement('div');
      row.className = 'row align-items-center py-2 border-bottom';

      const date = new Date(record.pm_date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });

      row.innerHTML = `
        <div class="col-md-6">
          <a href="#" class="open-modal text-decoration-none text-primary"
             data-bs-toggle="modal"
             data-bs-target="#helloModal"
             data-index="${index}"
             data-pm-id="${record.pm_id}">
            <i class="bi bi-file-earmark-text me-2"></i>
            ${record.pm_id}
          </a>
        </div>
        <div class="col-md-3 text-muted">${date}</div>
        <div class="col-md-3 text-muted action-btns">
          <button class="btn btn-success approve-btn me-1" data-id="${record._id}">Approve</button>
          <button class="btn btn-danger reject-btn" data-id="${record._id}">Reject</button>
        </div>
      `;

      container.appendChild(row);
    });

    // Modal content
    document.querySelectorAll('.open-modal').forEach(link => {
      link.addEventListener('click', e => {
        const index = e.currentTarget.getAttribute('data-index');
        const record = data[index];
        const modalContent = document.getElementById('modalContent');

        const checklist = record.checklist
          ? Object.entries(record.checklist).map(([k, v]) => `<li>${k}: <b>${v ? '✅' : '❌'}</b></li>`).join('')
          : `<li>No checklist available</li>`;

        const readings = record.readings
          ? Object.entries(record.readings).map(([k, v]) => `<li>${k}: <b>${v}</b></li>`).join('')
          : `<li>No readings available</li>`;

        modalContent.innerHTML = `
          <h5 class="mb-3">Preventive Maintenance Details</h5>
          <p><strong>PM ID:</strong> ${record.pm_id}</p>
          <p><strong>Zone:</strong> ${record.zone}</p>
          <p><strong>Location:</strong> ${record.location}</p>
          <p><strong>PM Date:</strong> ${new Date(record.pm_date).toLocaleDateString()}</p>
          <p><strong>Done By:</strong> ${record.pm_done_by}</p>
          <p><strong>Quarter:</strong> ${record.quarter}</p>
          <p><strong>Remarks:</strong> ${record.remarks || 'None'}</p>
          <hr>
          <h6>Checklist</h6>
          <ul>${checklist}</ul>
          <h6>Readings</h6>
          <ul>${readings}</ul>
        `;
      });
    });

    // Approve button
    document.querySelectorAll('.approve-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const row = e.target.closest('.row');
        const pmId = row.querySelector('.open-modal').dataset.pmId;

        const res = await fetch('/etl/user/maintenance/update-status', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pm_id: pmId, approved: true, approved_by: user.emp_id })
        });

        const msg = await res.text();
        alert(msg);

        row.querySelector('.action-btns').innerHTML = `<span class="badge bg-success">Approved</span>`;
      });
    });

    // Reject button
    document.querySelectorAll('.reject-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const row = e.target.closest('.row');
        const pmId = row.querySelector('.open-modal').dataset.pmId;

        const res = await fetch(`etl/user/${user.emp_id}/home/maintenance/update-status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pm_id: pmId, approved: false, approved_by: user.emp_id })
        });

        const msg = await res.text();
        alert(msg);

        row.querySelector('.action-btns').innerHTML = `<span class="badge bg-danger">Rejected</span>`;
      });
    });

  } catch (err) {
    console.error("Session or data load error:", err);
    alert("Please log in first.");
    window.location.href = "/etl/user";
  }
});
', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pm_id: pmId, approved: false })
        });

        const msg = await res.text();
        alert(msg);

        row.querySelector('.action-btns').innerHTML = `<span class="badge bg-danger">Rejected</span>`;
      });
    });

  } catch (err) {
    console.error("Session or data load error:", err);
    alert("Please log in first.");
    window.location.href = "/etl/user";
  }
});
