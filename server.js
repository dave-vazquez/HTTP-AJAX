const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
let nextId = 7;

function getNewId() {
  return nextId++;
}

let friends = [
  {
    id: 1,
    name: "Ben",
    age: 30,
    email: "ben@lambdaschool.com",
    image:
      "https://pbs.twimg.com/profile_images/497105470528552961/C8hCEUFw_400x400.jpeg"
  },
  {
    id: 2,
    name: "Austen",
    age: 32,
    email: "austen@lambdaschool.com",
    image:
      "https://pbs.twimg.com/profile_images/505117931332583425/y7xFUr-l_400x400.png"
  },
  {
    id: 3,
    name: "Ryan",
    age: 35,
    email: "ryan@lambdaschool.com",
    image: "https://lambdaschool.com/static/images/team/ryanh.jpg"
  },
  {
    id: 4,
    name: "Sean",
    age: 35,
    email: "sean@lambdaschool.com",
    image: "https://i.redd.it/6onq25y0sh311.jpg"
  },
  {
    id: 5,
    name: "Michelle",
    age: 67,
    email: "michelle@gmail.com",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
  },
  {
    id: 6,
    name: "Luis",
    age: 47,
    email: "luis@lambdaschool.com",
    image: "https://i.redd.it/6onq25y0sh311.jpg"
  }
];

app.use(cors());
app.use(bodyParser.json());

app.get("/friends", (req, res) => {
  res.status(200).json(friends);
});

app.post("/friends", (req, res) => {
  const friend = { id: getNewId(), ...req.body };
  friends = [...friends, friend];
  res.status(201).json(friends);
});

app.put("/friends/:id", (req, res) => {
  const { id } = req.params;
  let friendIndex = friends.findIndex(friend => friend.id == id);

  if (friendIndex >= 0) {
    friends[friendIndex] = { ...friends[friendIndex], ...req.body };
    res.status(200).json(friends);
  } else {
    res
      .status(404)
      .json({ message: `The friend with id ${id} does not exist.` });
  }
});

app.delete("/friends/:id", (req, res) => {
  friends = friends.filter(friend => friend.id != req.params.id);
  res.status(200).json(friends);
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
