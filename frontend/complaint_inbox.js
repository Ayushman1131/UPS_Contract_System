document.addEventListener('DOMContentLoaded', async () => {
	const tableBody = document.querySelector("tbody");
	const modalBody = document.querySelector("#complaintModal .modal-body");

	const res = await fetch("/etl/user/session", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const user = await res.json();
  window.empId = user.emp_id;
	// Fetch complaints
	const rest = await fetch(`/etl/user/${window.empId}/home/complaint/inbox`);
	const complaints = await rest.json();

	tableBody.innerHTML = ""; // Clear existing rows

	complaints.forEach(complaint => {
		const tr = document.createElement("tr");
		tr.innerHTML = `
			<td>
				<a href="#" class="open-complaint" data-id="${complaint.complaint_id}">
					${complaint.complaint_id}
				</a>
			</td>
			<td>${complaint.asset_number}</td>
			<td>${complaint.department}</td>
			<td>${new Date(complaint.date).toLocaleDateString()}</td>
			<td>
				<span class="badge ${complaint.Status === 'Completed' ? 'bg-success' : 'bg-warning-subtle text-warning'}">
					<i class="fa-solid fa-ellipsis-h"></i> ${complaint.Status}
				</span>
			</td>
			<td style="min-width: 60px">
				<div class="dropdown">
					<button class="btn btn-link text-muted p-0" type="button" data-bs-toggle="dropdown">
						<i class="fa-solid fa-ellipsis-h"></i>
					</button>
					<ul class="dropdown-menu dropdown-menu-end">
						<li><a class="dropdown-item" href="#">Accept</a></li>
						<li><a class="dropdown-item text-success" href="#">Completed</a></li>
					</ul>
				</div>
			</td>
		`;
		tableBody.appendChild(tr);

		// Modal trigger setup
		tr.querySelector(".open-complaint").addEventListener("click", (e) => {
			e.preventDefault();
			const c = complaint;
			modalBody.innerHTML = `
				<h5 class="mb-3 text-primary">Complaint ID: ${c.complaint_id}</h5>
				<p><strong>Asset Number:</strong> ${c.asset_number}</p>
				<p><strong>BOQ Item ID:</strong> ${c.boq_item_id}</p>
				<p><strong>Date:</strong> ${new Date(c.date).toLocaleString()}</p>
				<p><strong>Mobile No:</strong> ${c.mobile_no}</p>
				<p><strong>Category:</strong> ${c.category}</p>
				<p><strong>Department:</strong> ${c.department}</p>
				<p><strong>Description:</strong> ${c.description}</p>
				<p><strong>Location:</strong> ${c.location}</p>
				<p><strong>Ratings:</strong> ${c.ratings}</p>
				<p><strong>Zone:</strong> ${c.zone}</p>
				<p><strong>Status:</strong> ${c.Status}</p>
			`;
			const modal = new bootstrap.Modal(document.getElementById("complaintModal"));
			modal.show();
		});
	});
});
