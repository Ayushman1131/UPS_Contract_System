const mongoose = require('mongoose');

// Replace with your real MongoDB URI (and make sure it connects to UPSdb)
const uri = 'mongodb+srv://sebastianstan0999:zqvzG4YehpBZackg@upscluster0.kdhfkut.mongodb.net/UPSdb';

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error:', err));

const userSchema = new mongoose.Schema(
	{
		username: String,
  	password: String
	}, { collection: 'mydb' });

const User = mongoose.model('User', userSchema);

const boqSchema = new mongoose.Schme

async function debugDocuments() {
	try {
		// Exclude _id field
		const docs = await User.findOne({username: "ayush9999"});
		console.log('All documents without _id:', docs);
	} catch (err) {
		console.error('Query error:', err);
	} finally {
		mongoose.disconnect();
	}
}

debugDocuments();
