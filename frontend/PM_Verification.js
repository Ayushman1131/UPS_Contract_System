// PM_Verification.js

window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('pm-verification-container');
  const modal = new bootstrap.Modal(document.getElementById('helloModal'));
  const modalContent = document.getElementById('modalContent');

  try {
    const res = await fetch('/etl/user/session', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const user = await res.json();
    if (!user?.emp_id || !user?.zone) {
      throw new Error('Session missing');
    }

    const dataRes = await fetch(`/etl/user/${user.emp_id}/home/maintenance/records`);
    const maintenanceList = await dataRes.json();

    if (!Array.isArray(maintenanceList)) {
      container.innerHTML = '<p class="text-danger">No maintenance records found.</p>';
      return;
    }

    maintenanceList.forEach((record) => {
      if (record.verified) return; // show only unverified records

      const row = document.createElement('div');
      row.className = 'row align-items-center mb-2 py-2 border-bottom';
      row.innerHTML = `
        <div class="col-md-6">${record.pm_id}</div>
        <div class="col-md-3">${new Date(record.pm_date).toLocaleDateString()}</div>
        <div class="col-md-3">
          <button class="btn btn-success btn-sm me-2" data-id="${record.pm_id}" data-action="verify">Verify</button>
          <button class="btn btn-secondary btn-sm" data-id="${record.pm_id}" data-action="view">View</button>
        </div>
      `;
      container.appendChild(row);
    });

    container.addEventListener('click', async (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const action = btn.dataset.action;
      const pm_id = btn.dataset.id;

      if (action === 'verify') {
        const updateRes = await fetch(`/etl/user/${user.emp_id}/home/maintenance/update-status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pm_id: pm_id, verified: true, verified_by: { emp_id: user.emp_id } })
        });
        const msg = await updateRes.text();
        alert(msg);
        btn.closest('.row').remove();
      }

      if (action === 'view') {
        const record = maintenanceList.find(item => item.pm_id === pm_id);
        if (!record) return;
        modalContent.innerHTML = `
          <h5><strong>PM ID:</strong> ${record.pm_id}</h5>
          <p><strong>Location:</strong> ${record.location}</p>
          <p><strong>Done By:</strong> ${record.pm_done_by}</p>
          <p><strong>Remarks:</strong> ${record.remarks}</p>
          <p><strong>PM Date:</strong> ${new Date(record.pm_date).toLocaleDateString()}</p>
        `;
        modal.show();
      }
    });
  } catch (err) {
    console.error('Session or data load error:', err);
    container.innerHTML = '<p class="text-danger">Please log in</p>';
  }
});
