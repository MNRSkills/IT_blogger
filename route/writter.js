const writterRoute = require("express").Router();
const Writter = require("../model/posts");

writterRoute.get("/", (req, res) => {
  Writter.find((err, items) => {
    if (err) {
      res.status(400).json({
        msg: "this did not work",
        ERROR: `${err}`,
      });
    } else {
      res.status(200).json({
        response: items,
      });
    }
  });
});

//FOUND  THE ANSWER TO NESTED ARRAY OBJECTS IN MONGODB
//NOW WE HAVE TO SHORT HAND THE BELOW ROUTE.

writterRoute.post("/post", (req, res) => {
  console.log("THIS IS THE BEGINING ", req.body);
  const nwPost = new Writter({
    person: {
      age: req.body.person.age,
      address: {
        street: req.body.person.address.street,
        city: req.body.person.address.city,
        apt_num: req.body.person.address.apt_num,
        zip: req.body.person.address.zip,
      },
    },
  })
  nwPost
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



writterRoute.delete("/delete", (req, res) => {
  Writter
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
})

module.exports = writterRoute;
