document.addEventListener("DOMContentLoaded", async () => {
	const container = document.getElementById("complaint-list");

	try {
		// Get session user
		const res = await fetch("/etl/user/session", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});

		const user = await res.json();
		const empId = user.emp_id;

		// Get complaints
		const response = await fetch(`/etl/user/${empId}/home/complaint/records`);
		const complaints = await response.json();

		if (!Array.isArray(complaints)) {
			container.innerHTML = `<p class="text-danger">${complaints}</p>`;
			return;
		}

		complaints.forEach((item, index) => {
			const date = item.date ? new Date(item.date).toLocaleDateString() : "N/A";
			const complaintId = item.complaint_id || `Complaint ${index + 1}`;

			// Desktop Row
			const row = document.createElement("div");
			row.className = "row align-items-center py-2 border-bottom d-none d-md-flex";
			row.style.cursor = "pointer";

			row.innerHTML = `
				<div class="col-md-6 text-primary fw-semibold open-modal" data-index="${index}">
					<i class="fa-solid fa-file-lines me-2"></i>${complaintId}
				</div>
				<div class="col-md-3 text-muted">${date}</div>
				<div class="col-md-3">
					<button class="btn btn-sm btn-outline-success open-modal" data-index="${index}">
						View Details
					</button>
				</div>
			`;

			// Mobile Card
			const card = document.createElement("div");
			card.className = "card mb-3 shadow-sm d-block d-md-none";
			card.innerHTML = `
				<div class="card-body">
					<h6 class="text-primary fw-bold open-modal" data-index="${index}">
						<i class="fa-solid fa-file-lines me-2"></i>${complaintId}
					</h6>
					<p class="text-muted small mb-1">Date: ${date}</p>
					<button class="btn btn-sm btn-outline-success open-modal" data-index="${index}">
						View Details
					</button>
				</div>
			`;

			// Store complaint data as dataset
			row.dataset.details = JSON.stringify(item);
			card.dataset.details = JSON.stringify(item);

			container.appendChild(row);
			container.appendChild(card);
		});

		// Modal Event Handler
		document.querySelectorAll(".open-modal").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const dataStr = e.currentTarget.closest("[data-details]")?.dataset.details;
				if (!dataStr) return;

				const data = JSON.parse(dataStr);
				const modalBody = document.querySelector("#complaintModal .modal-body");

				modalBody.innerHTML = `
					<p><strong>Complaint ID:</strong> ${data.complaint_id || "N/A"}</p>
					<p><strong>Asset Number:</strong> ${data.asset_number || "N/A"}</p>
					<p><strong>BOQ Item ID:</strong> ${data.boq_item_id || "N/A"}</p>
					<p><strong>Location:</strong> ${data.location || "N/A"}</p>
					<p><strong>Zone:</strong> ${data.zone || "N/A"}</p>
					<p><strong>Category:</strong> ${data.category || "N/A"}</p>
					<p><strong>Department:</strong> ${data.department || "N/A"}</p>
					<p><strong>Mobile No:</strong> ${data.mobile_no || "N/A"}</p>
					<p><strong>Description:</strong> ${data.description || "N/A"}</p>
					<p><strong>Status:</strong> ${data.Status || "Open"}</p>
					<p><strong>Date:</strong> ${data.date ? new Date(data.date).toLocaleDateString() : "N/A"}</p>
				`;

				const modal = new bootstrap.Modal(document.getElementById("complaintModal"));
				modal.show();
			});
		});
	} catch (error) {
		console.error("Error loading complaint records:", error);
		container.innerHTML = `<p class="text-danger">Failed to load complaints.</p>`;
	}
});
