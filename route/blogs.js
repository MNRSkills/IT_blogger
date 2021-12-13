const blogRouter = require("express").Router();
const authorBlog = require("../model/posts");

blogRouter.get("/", async (req, res) => {
  try {
    res.send("Hello Mom");
  } catch (error) {
    res.send(`${error}`);
  }
});

blogRouter.post("/post", async (req, res) => {
  const newPost = new authorBlog({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact: req.body.contact,
    blog_posts: req.body.blog_posts,
  });
  await newPost
    .save()
    .then((post) =>
      res.status(200).json({
        msg: "Blog post is up",
        blogPost: post,
      })
    )
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
