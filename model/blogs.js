const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newBlog = new Schema({
  blog_post: {
    slug: String,
    title: String,
    category: [String],
    tag: String,
    content: String,
    author: {
      first_name: String,
      last_name: String,
    },
    published: Boolean,
    thumbnail_image: String,
    header_image: String
  },
});

module.exports = mongoose.model("BlogPost", newBlog);
