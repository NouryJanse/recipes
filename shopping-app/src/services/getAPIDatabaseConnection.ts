import mongoose from "mongoose";
let connectionString = import.meta.env.DATA_CONNECTION || "";

const getAPIDatabaseConnection = async () => {
  try {
    await mongoose.connect(connectionString, {});
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default getAPIDatabaseConnection;
