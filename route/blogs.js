const blogRouter = require("express").Router();
const BlogPost = require("../model/blogs");
const { cloudinary } = require("../utils/utils")

blogRouter.get("/", async (req, res) => {
  BlogPost.find((err, items) => {
    if (err) {
      res.status(401).json({
        msg: err,
      });
    } else {
      res.status(200).json({
        response: items,
      });
    }
  });
});


blogRouter.post("/blog_posts", (req, res) => {
  const post = new BlogPost({
    blog_post: {
      slug: req.body.blog_post.slug,
      title: req.body.blog_post.title,
      category: [req.body.blog_post.category],
      tag: req.body.blog_post.tag,
      content: req.body.blog_post.content,
      author: {
        first_name: req.body.blog_post.author.first_name,
        last_name: req.body.blog_post.author.last_name,
      },
      published: req.body.blog_post.published,
      thumbnail_image: req.body.blog_post.thumbnail_image,
      header_image: req.body.blog_post.header_image,
    },
  });
  post
    .save()
    .then((post) => {
      res.status(200).json({
        msg: "this message is if you pass",
        POST: post,
      });
    })
    .catch((err) => {
      res.status(400).json({
        ErrorMSG: "This didn't work ty again",
        Error: `${err}`,
      });
    });
});

blogRouter.delete("/delete-all", (req, res) => {
  authorBlog
    .deleteMany({})
    .then((removed) =>
      res.json({
        msg: " All are removed",
        deletedItem: removed,
      })
    )
    .catch((err) =>
      res.status(400).json({
        ERROR: err,
      })
    );
});

module.exports = blogRouter;
