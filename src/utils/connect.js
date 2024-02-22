const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGODB_URI);

// mongoose.connection.on("error", (err) => {
//   console.error(err);
// });

async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}
module.exports = { mongoConnect, mongoDisconnect };
