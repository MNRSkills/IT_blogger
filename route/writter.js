const writterRoute = require("express").Router();
const Writter = require("../model/posts");

writterRoute.get("/", (req, res) => {
  res.send("Hello world this is me working on something stupid");
});


//FOUND  THE ANSWER TO NESTED ARRAY OBJECTS IN MONGODB
//NOW WE HAVE TO SHORT HAND THE BELOW ROUTE.

writterRoute.post("/post", (req, res) => {
  console.log("THIS IS THE BEGINING ", req.body)
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
  });
  console.log(nwPost.person, "THIS IS IMPORTATN:")
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

module.exports = writterRoute;
