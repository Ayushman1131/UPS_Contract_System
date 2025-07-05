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

		window.emp_id = user.emp_id;
		window.name = user.name;
	} catch (err) {
		console.error("Session load error:", err);
		alert("Please log in first.");
		window.location.href = "/etl/user"; // Redirect to login
	}
});

document.getElementById("pmForm").addEventListener("submit", async (event) => {
	event.preventDefault();

	document.getElementById("pmDoneBy").textContent = window.name;

	try {
		const midRes = await fetch(
			`/etl/user/${window.emp_id}/home/maintenance/maintenance-id`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);

		const midData = await midRes.json();
		const maintenance_id = midData.maintenance_id;

		if (!midRes.ok || !maintenance_id) {
			throw new Error("Failed to get maintenance ID");
		}

		const res = await fetch(
			`/etl/user/${window.emp_id}/home/maintenance/form`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					maintenance_id,
					boq_item_id: document.getElementById("boqItemId").value.trim(),
					location: document.getElementById("location").value.trim(),
					pm_date: document.getElementById("date").value.trim(),
					pm_done_by: window.name,
					checklist: {
						functional_checking: document
							.getElementById("Functional-Checking")
							.value.trim(),
						redundancy_healthiness: document
							.getElementById("Redundancy-Healthiness")
							.value.trim(),
						battery_takeover: document
							.getElementById("Battery-Takeover")
							.value.trim(),
						static_bypass_changeover: document
							.getElementById("Static-Bypass-Changeover")
							.value.trim(),
						protection_checking: document
							.getElementById("Protection Checking")
							.value.trim(),
						cleaning_done: document
							.getElementById("Blowing/Vacuum-Cleaning")
							.value.trim(),
						tightness: document
							.getElementById("Tightness-of-Connections")
							.value.trim(),
						physical_damage: document
							.getElementById("Physical-Damage-Check")
							.value.trim(),
						working_of_contractors: document
							.getElementById("Working-of-Contactors")
							.value.trim(),
						all_thyristors: document
							.getElementById("All-Thyristors")
							.value.trim(),
						all_igbts: document.getElementById("All-IGBTs").value.trim(),
						diodes_and_capacitors: document
							.getElementById("Diodes-and-Capacitors")
							.value.trim(),
						indication_lamps: document
							.getElementById("Indication-Lamps")
							.value.trim(),
						cooling_fans: document.getElementById("Cooling-Fans").value.trim(),
						panel_locking: document
							.getElementById("Panel-Locking")
							.value.trim(),
						switches_checking: document
							.getElementById("Switches-Checking")
							.value.trim(),
						maintenance_of_distibution_boards: document
							.getElementById("Panel-Distribution-Boards")
							.value.trim(),
						connecting_cables: document
							.getElementById("Connecting-Cables")
							.value.trim(),
						panel_meters: document
							.getElementById("Panel-Meters-Working")
							.value.trim(),
						PPE: document.getElementById("PPE-Check").value.trim(),
						tools: document
							.getElementById("Tools-&-Calibrated-Instruments")
							.value.trim(),
						surroundings: document
							.getElementById("Surroundings-&-Escape-Path")
							.value.trim(),
						work_prermit: document
							.getElementById("Work-Permit-from-Shop-Electrical")
							.value.trim(),
					},
					readings: {
						ac_input_voltage: {
							ry: document.getElementById("ac_input_voltage-ry").value.trim(),
							yb: document.getElementById("ac_input_voltage-rb").value.trim(),
							br: document.getElementById("ac_input_voltage-br").value.trim(),
            },
						ac_input_current: {
							iy: document.getElementById("ac_input_current-iy").value.trim(),
							ib: document.getElementById("ac_input_current-ib").value.trim(),
							ir: document.getElementById("ac_input_current-ir").value.trim(),
            },

						input_frequency: document.getElementById("input-frequency").value.trim(),
						dc_rectifier_output_current: document.getElementById("dc-rectifier-output").value.trim(),
						dc_smps_voltages: document.getElementById("dc-smps").value.trim(),
						ac_smps_voltages: document.getElementById("ac-smps").value.trim(),
						ac_output_voltage: document.getElementById("ac-output-voltage").value.trim(),
						ac_output_current: document.getElementById("ac-output-current").value.trim(),
						output_frequency: document.getElementById("output-frequenct").value.trim(),
						battery_voltage_current: document.getElementById("battery-voltage").value.trim(),
						aux_input_current: {
							iy: document.getElementById("aux-input-current-iy").value.trim(),
							ib: document.getElementById("aux-input-current-ib").value.trim(),
							ir: document.getElementById("aux-input-current-ir").value.trim(),
						},
						aux_input_voltage: {
							ry: document.getElementById("aux-input-voltage-ry").value.trim(),
							yb: document.getElementById("aux-input-voltage-yb").value.trim(),
							br: document.getElementById("aux-input-voltage-br").value.trim(),
						},
						aux_output_voltage: document.getElementById("aux-output-voltage").value.trim(),
						aux_output_current: document.getElementById("aux-output-current").value.trim(),
						aux_input_frequency: document.getElementById("aux-input-frequency").value.trim(),
						battery_backup_time: document.getElementById("battery-backup-time").value.trim(),
						battery_data: {
							ah: document.getElementById("").value.trim(),
							rating: document.getElementById("").value.trim(),
							cells: document.getElementById("").value.trim(),
							make: String,
							type: String,
						},
					},
					spares_replaced: Boolean,
					remarks: String,
				}),
			}
		);

		const result = await res.json();
		if (res.ok) {
			alert(`Maintenance request raised successfully! ID: ${maintenance_id}`);
		} else {
			alert("Error raising maintenance request: " + result.message);
		}
	} catch (err) {
		console.error("Error submitting maintenance request:", err);
		alert("Failed to submit maintenance request. Please try again.");
	}

	window.location.href = `/etl/user/${window.emp_id}/home`;
});
