// implement your API here
const express = require("express");
let users = require("./data/seeds/users");
const helpers = require("./data/db");

const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
    helpers.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: "The user data is not available" })
        })
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
   helpers.findById(id)
       .then(user => {
        res.status(200).json(user)
       })
       .catch(err => {
           console.log(err);
           res.status(404).json({ message: `The user with id - ${id} could not be found`})
       })
});

server.post("/api/users", (req, res) => {
    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
        created_at: Date.now(),
        updated_at: Date.now()
    };
    helpers.insert(newUser)
        .then( user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Bad request, check your user object" })
        })
});

server.put("/api/users/:id", (req, res) => {
    const updateUser = req.body;
    const id = req.params.id;
    helpers.update(id, updateUser)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Bad request, check your user object" })
        })
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    helpers.remove(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: `The user with id of ${id} does not exist`})
        })
});

const port = 8080;
const host = "127.0.0.1";
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
});



