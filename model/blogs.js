const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const author = new Schema({
//   fName: { type: String },
//   phone: { type: Number },
//   email: { type: String },
// });

const newBlog = new Schema(
  {
    title: "String",
    subtitle: "String",
    author: [
      {
        fName: "String",
        phone: "String",
        email: "String",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogPost", newBlog);
