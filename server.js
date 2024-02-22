const http = require("http");
const {mongoConnect} = require("./src/utils/connect");

const app = require("./src/app");

const server = http.createServer(app);

const startServer = async (server) => {
  try {
    await mongoConnect();
    server.listen(8080);

    console.log("server started on port 8080");
  } catch (err) {
    console.error(err);
  }
};

startServer(server);
