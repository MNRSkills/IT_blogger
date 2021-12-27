const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const contactSchema = new Schema({
//   twitter_handle: { type: String },
//   facebook_page: { type: String },
//   linkedin_page: { type: String },
// });

// const Blog_posts = new Schema(
//   {
//     title: { type: String },
//     subtitle: { type: String },
//     content: { type: String },
//     banner_image: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

const Writter = new Schema({
  person: {
    age: Number,
    address: [
      {
        street: String,
        city: String,
        apt_num: String,
        zip: Number,
      },
    ],
  },
});

module.exports = mongoose.model("Writter_Schema", Writter);
