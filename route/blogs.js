const blogRouter = require("express").Router();
const BlogPost = require("../model/blogs");
const { ObjectId } = require("mongodb");

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


blogRouter.post("/test", (req, res) => {
  console.log("REQ:", req.body);
  const post = new BlogPost({
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: [{
      fName: req.body.author.fName,
      phone: req.body.author.phone,
      email: req.body.author.email
    }]
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
