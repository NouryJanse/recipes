// import Mongoose from "mongoose";

let connectionString = import.meta.env.DATA_CONNECTION || "";

// const connectDB = async () => {
//   await Mongoose.connect(connectionString, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//   });
//   console.log("MongoDB Connected");
// };

// if (!connectionString) {
//   throw new Error(
//     "No connection string provided. \n\nPlease create a `.env` file in the root of this project. Add a DATA_CONNECTION variable to that file with the connection string to your MongoDB cluster. \nRefer to the README.md file for more information."
//   );
// }
// if (connectionString.indexOf("appName") === -1) {
//   connectionString += connectionString.indexOf("?") > -1 ? "&appName=remix|" : "?appName=remix|";
// } else {
//   connectionString = connectionString.replace(/appName\=([a-z0-9]*)/i, (_m: string, p: string) => `appName=remix|${p}`);
// }

// let MongooseDB: Mongoose;

// // declare global {
// //   var __db: MongoClient | undefined;
// // }

// // if (process.env.NODE_ENV === "production") {
// //   mongodb = new MongoClient(connectionString);
// // } else {
// //   if (!global.__db) {
// //     global.__db = new MongoClient(connectionString);
// //   }
// //   mongodb = global.__db;
// // }

// export { connectDB };

// import { Schema, model, connect } from "mongoose";

// // 1. Create an interface representing a document in MongoDB.
// interface IUser {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// // 2. Create a Schema corresponding to the document interface.
// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   avatar: String,
// });

// // 3. Create a Model.
// const User = model<IUser>("User", userSchema);

// async function run() {
//   // 4. Connect to MongoDB
//   await connect(connectionString);

//   // const user = new User({
//   //   name: "Bill",
//   //   email: "bill@initech.com",
//   //   avatar: "https://i.imgur.com/dM7Thhn.png",
//   // });
//   // await user.save();

//   // console.log(user.email); // 'bill@initech.com'
// }

// export default run;

// Importing the development support form utils/development.js
// const { printConsole } = require("../utils/devlopment");

//Importing the mongoose library used to make the mongodb connection
import mongoose from "mongoose";

//Importing the mongodb atlas link
// const MONGO_DB_URI = process.env.MONO_REMOTE_URL;
//creating a function called connectToDB that handles the database connectio
const connectToDB = async () => {
  try {
    // console.log("connecting");

    // printConsole(
    //   { data: "Connecting to MongoDB ......" },
    //   { printLocation: "db_config.js:12" },
    //   { textColor: "yellow" }
    // );

    //creating the mongodb database connection by using MONOG_DB_URI
    await mongoose.connect(connectionString, {});

    // console.log(DBConnection.connect);

    // printConsole(
    //   { data: `Database Connected : ${DBConnection.connection.host}` },
    //   { printLocation: "db_config.js:24" },
    //   {
    //     textColor: "green",
    //   }
    // );
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

// EXPORTING THE connectToDB function
export default connectToDB;
