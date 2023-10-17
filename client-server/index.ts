// const path = require("path");
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import compression from "compression";
import morgan from "morgan";

const MODE = process.env.NODE_ENV;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let shoppingList: any = [];

io.on("connection", (socket) => {
  console.log(`connect: ${socket.id}`);

  socket.on("firstTimeLoad", () => {
    io.emit("firstTimeLoad", shoppingList);
  });

  socket.on("shoppingList", (msg) => {
    io.emit("onShoppingListUpdate", msg);
    shoppingList = msg;
  });

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

app.use(compression());

// You may want to be more aggressive with this caching
app.use(express.static("public", { maxAge: "1h" }));

// Remix fingerprints its assets so we can cache forever
app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));

app.use(morgan("tiny"));

const port = process.env.PORT || 1234;

httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

setInterval(() => {
  io.emit("message", new Date().toISOString());
}, 2500);

// ////////////////////////////////////////////////////////////////////////////////
// function purgeRequireCache() {
//   // purge require cache on requests for "server side HMR" this won't let
//   // you have in-memory objects between requests in development,
//   // alternatively you can set up nodemon/pm2-dev to restart the server on
//   // file changes, we prefer the DX of this though, so we've included it
//   // for you by default
//   for (const key in require.cache) {
//     if (key.startsWith(BUILD_DIR)) {
//       delete require.cache[key];
//     }
//   }
// }
