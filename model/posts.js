const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  email: { type: String },
  twitter_handle: { type: String },
  facebook_page: { type: String },
  linkedin_page: { type: String },
});

const Blog_posts = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    content: { type: String },
    banner_image: { type: String },
  },
  {
    timestamps: true,
  }
);

const author = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  contact: [{ contactSchema }],
  blog_posts: [{ Blog_posts }],
});

module.exports = mongoose.model("Blog_posts", author);
