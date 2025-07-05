window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/etl/user/session', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const user = await res.json();

    const welcomeBox = document.getElementById("heading-link");
    if (welcomeBox) {
      welcomeBox.textContent = `Welcome, ${user.name}`;
    }

    window.emp_id = user.emp_id;

  } catch (err) {
    console.error("Session load error:", err);
    alert("Please log in first.");
    window.location.href = "/etl/user"; // Redirect to login
  }
});

document.getElementById("complaintForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const cidRes = await fetch(`/etl/user/${window.emp_id}/home/complaint/complaint-id`,
			{
			method: "GET",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
    
    const cidData = await cidRes.json();
    const complaint_id = cidData.complaint_id;

    if (!cidRes.ok || !complaint_id) {
      throw new Error("Failed to get complaint ID");
    }

    const res = await fetch(`/etl/user/${window.emp_id}/home/complaint/form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
				asset_number: document.getElementById("assetNumber").value.trim(),
        boq_item_id: document.getElementById("boqItemId").value.trim(),
        category: document.getElementById("category").value.trim(),
        complaint_id,
        date: document.getElementById("date-now").value.trim(),
        department: document.getElementById("department").value.trim(),
				max_no: document.getElementById("maxNo").value.trim(),
				mobile_no: document.getElementById("mobileNo").value.trim(),
        description: document.getElementById("description").value.trim(),
        location: document.getElementById("location").value.trim(),
        ratings: document.getElementById("ratings").value.trim(),
        zone: document.getElementById("zone").value.trim()
      })
    });

    const result = await res.json();
    if (res.ok) {
      alert(`Complaint submitted successfully! ID: ${complaint_id}`);
    } else {
      alert(result.message || "Submission failed");
    }
		
  } catch (err) {
		console.error("Error during complaint submission:", err);
    alert("Server error. Try again later.");
  }
	
	window.location.href=`/etl/user/${window.emp_id}/home`;
});
