import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import compression from "compression";
// import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { mongodb, ObjectId } from "./db";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(compression());
// You may want to be more aggressive with this caching
app.use(express.static("public", { maxAge: "1h" }));
// Remix fingerprints its assets so we can cache forever
app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));
// app.use(morgan("tiny"));

const port = process.env.PORT || 1234;

httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

io.on("connection", (socket) => {
  // console.info(`connect: ${socket.id}`);

  socket.on("firstTimeLoad", () => {
    // io.emit("firstTimeLoad", shoppingList);
  });

  socket.on("listUpdate", async (msg) => {
    const COLLECTION_NAME = process.env.COLLECTION_NAME as string;
    const DB_NAME = process.env.DB_NAME as string;
    try {
      const shoppingList = JSON.parse(msg);
      let db = await mongodb.db(DB_NAME);
      let collection = await db.collection(COLLECTION_NAME);

      if (shoppingList._id) {
        let res = await collection.replaceOne({ _id: shoppingList._id }, { ...shoppingList });
        console.info(res);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.info(`disconnect: ${socket.id}`);
  });
});

// setInterval(() => {
//   console.log(Date.now());
//   console.log(shoppingList);
//   io.emit("message", new Date().toISOString());
// }, 3000);