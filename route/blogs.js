const blogRouter = require("express").Router();
const BlogPost = require("../model/blogs");
const { cloudinary } = require("../utils/uploadConfig");

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

blogRouter.post("/blog_posts", async (req, res) => {
  console.log("ARE WE  GETTING REQUESTS", req.body);
  const file = req.files;
  try {
    // console.log(file, "THIS IS ANOTHER PIC");
    const cloud = await cloudinary.uploader.upload(
      file.header_image.tempFilePath && file.thumbnail_image.tempFilePath,
      { upload_preset: "IT_Blog" }
    );
    console.log("THIS IS THE CLOUDINARY RES", cloud)
    const post = await new BlogPost({
      slug: req.body.slug,
      title: req.body.title,
      category: [req.body.category],
      tag: req.body.tag,
      content: req.body.content,
      published: req.body.published,
      thumbnail_image: cloud.secure_url,
      header_image: cloud.secure_url,
    });
    await post
      .save()
      .then((post) => {
        res.status(200).json({
          msg: "this message is if you pass",
          POST: post,
        });
      })
      .catch((err) => {
        res.status(400).json({
          ErrorMSG: "The first error in the api",
          Error: `${err}`,
        });
      });
  } catch (err) {
    res.status(400).json({
      ErrorMSG: "This didn't work ty again",
      Error: `${err}`,
    });
  }
});

blogRouter.delete("/delete-all", (req, res) => {
  BlogPost.deleteMany({})
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
