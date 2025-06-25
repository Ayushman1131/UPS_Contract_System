const mongoose= require ('mongoose');
const hashExistingPasswordsOnce= require('../utils/hashExistingPassword'); 

const connectDB = async (env) => {
  try {
    await mongoose.connect(env.UPSDB_URI);
    console.log("MongoDB connected successfully");
   
    await hashExistingPasswordsOnce();
  
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;