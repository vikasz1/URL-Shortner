const mongoose = require("mongoose");

function startConnection(url) {
  mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB");
  });
}

module.exports = {
  startConnection,
};
