const blogRouter = require("express").Router();
const res = require("express/lib/response");
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
      file.thumbnail_image.tempFilePath,
      { upload_preset: "IT_Blog" }
    );
    console.log("THIS IS THE CLOUDINARY RES", cloud);
    const post = await new BlogPost({
      slug: req.body.slug,
      title: req.body.title,
      category: [req.body.category],
      tag: req.body.tag,
      content: req.body.content,
      published: req.body.published,
      thumbnail_image: cloud.secure_url,
    });
    await post.save().then((post) => {
      res.status(200).json({
        msg: "this message is if you pass",
        POST: post,
      });
    });
  } catch (err) {
    res.status(400).json({
      ErrorMSG: "This didn't work ty again",
      Error: `${err}`,
    });
  }
});

blogRouter.put("/:id/update", (req, res) => {
  const params = req.params.id;
  console.log("this is the params", params)
  try {
    BlogPost.findByIdAndUpdate(params,{
      title: req.body.title
    }, {new: true})
    .then(update => {
      res.status(200).json({
        msg: "This did work",
        UPDATE: update,
      })
    })
  } catch (error) {
    res.status(400).json({
      erroMSG: "this is not good",
      Error: `${error}`
    })
  }
});

blogRouter.delete("/delete-all", async (req, res) => {
  try {
    BlogPost.deleteMany({}).then((removed) =>
      res.json({
        msg: " All are removed",
        deletedItem: removed,
      })
    );
  } catch (error) {
    res.status(400).json({
      ErrorMSG: "This didn't work ty again",
      Error: `${err}`,
    });
  }
});

module.exports = blogRouter;
