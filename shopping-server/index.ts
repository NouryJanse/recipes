import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { ObjectId, mongodb } from "./db";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// You may want to be more aggressive with this caching
app.use(express.static("public", { maxAge: "1h" }));
// Remix fingerprints its assets so we can cache forever
app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));

io.on("connection", (socket) => {
  console.info(`connect: ${socket.id}`);

  socket.on("listUpdate", async (msg) => {
    console.info("listUpdate received");
    const COLLECTION_NAME = process.env.COLLECTION_NAME as string;
    const DB_NAME = process.env.DB_NAME as string;

    try {
      const data = JSON.parse(msg);
      const { userId } = data;
      let db = mongodb.db(DB_NAME);
      let collection = db.collection(COLLECTION_NAME);

      if (userId) {
        const filter = { userId };
        const options = { upsert: true };
        let res = await collection.replaceOne(filter, data, options);
        console.info("emitting message");
        io.emit("onShoppingListUpdate", msg);

        console.info(res);
      } else {
        console.info("No shopping list id found");
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.info(`disconnect: ${socket.id}`);
  });
});

const port = process.env.PORT || 1234;

httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
