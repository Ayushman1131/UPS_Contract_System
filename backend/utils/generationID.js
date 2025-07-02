const Complaint = require('../models/Complaint');
const Maintenance = require('../models/Maintenance');

exports.generateNextComplaintId = async () => {
  const allComplaints = await Complaint.find({ complaint_id: { $regex: /^CMP\d+$/ } });
  if (allComplaints.length === 0) return "CMP001";

  const maxIdNum = allComplaints.reduce((max, item) => {
    const num = parseInt(item.complaint_id.replace("CMP", ""), 10);
    return num > max ? num : max;
  }, 0);

  const nextIdNum = maxIdNum + 1;
  const nextIdStr = nextIdNum.toString().padStart(3, "0");

  return `CMP${nextIdStr}`;
};

exports.generateNextMaintenanceId = async () => {
	const allMaintenances = await Maintenance.find({ maintenance_id: { $regex: /^PM$/ } });
	if (allMaintenances.length === 0) return "PM001";

	const maxIdNum = allMaintenances.reduce((max, item) => {
		const num = parseInt(item.maintenance_id.replace("PM", ""), 10);
		return num > max ? num : max;
	}, 0);

	const nextIdNum = maxIdNum + 1;
	const nextIdStr = nextIdNum.toString().padStart(3, "0");

	return `PM${nextIdStr}`;
}