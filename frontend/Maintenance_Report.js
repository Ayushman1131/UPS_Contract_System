document.addEventListener("DOMContentLoaded", async () => {
	const container = document.getElementById("maintenance-list");

	try {
		const res = await fetch("/etl/user/session", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const user = await res.json();
    window.empId = user.emp_id;

		const rest = await fetch(`/etl/user/${window.empId}/home/maintenance/records`);
		const records = await rest.json();

		if (!Array.isArray(records)) {
			container.innerHTML = `<p class="text-danger">${records}</p>`;
			return;
		}

		records.forEach((record, i) => {
			const formattedDate = new Date(record.pm_date).toLocaleDateString();
			const rowId = `row-${i}`;

			// Desktop row
			const desktopRow = `
				<div class="row align-items-center py-2 border-bottom d-none d-md-flex open-modal" style="cursor: pointer;" data-index="${i}">
					<div class="col-md-6">
						<i class="fa-solid fa-file-lines text-primary me-2"></i> ${record.pm_id}
					</div>
					<div class="col-md-3 text-muted">${formattedDate}</div>
					<div class="col-md-3 text-muted">View</div>
				</div>
			`;

			// Mobile card
			const mobileCard = `
				<div class="card mb-3 shadow-sm d-block d-md-none open-modal" style="cursor: pointer;" data-index="${i}">
					<div class="card-body">
						<div class="text-primary fw-bold mb-2">
							<i class="fa-solid fa-file-lines text-primary me-2"></i> ${record.pm_id}
						</div>
						<p class="text-muted small mb-0">${formattedDate}</p>
					</div>
				</div>
			`;

			container.insertAdjacentHTML("beforeend", desktopRow + mobileCard);
			container.dataset[`record${i}`] = JSON.stringify(record);
		});

		document.querySelectorAll(".open-modal").forEach((el) => {
			el.addEventListener("click", () => {
				const index = el.getAttribute("data-index");
				const record = JSON.parse(container.dataset[`record${index}`]);

				document.getElementById("modalContent").innerHTML = `
					<h5 class="mb-3">Maintenance Details</h5>
					<p><strong>PM ID:</strong> ${record.pm_id}</p>
					<p><strong>Date:</strong> ${new Date(record.pm_date).toLocaleDateString()}</p>
					<p><strong>Location:</strong> ${record.location}</p>
					<p><strong>Zone:</strong> ${record.zone}</p>
					<p><strong>Quarter:</strong> ${record.quarter}</p>
					<p><strong>BOQ Item ID:</strong> ${record.boq_item_id}</p>
					<p><strong>PM Done By:</strong> ${record.pm_done_by}</p>
					<p><strong>Verified:</strong> ${record.verified ? "Yes" : "No"}</p>
					<p><strong>Verified By:</strong> ${record.verified_by?.emp_id || "N/A"}</p>
					<p><strong>Approved:</strong> ${record.approved ? "Yes" : "No"}</p>
					<p><strong>Approved By:</strong> ${record.approved_by?.emp_id || "N/A"}</p>
				`;

				const modal = new bootstrap.Modal(document.getElementById("helloModal"));
				modal.show();
			});
		});

	} catch (error) {
		console.error("Error fetching maintenance records:", error);
		container.innerHTML = `<p class="text-danger">Error loading maintenance records.</p>`;
	}
});
