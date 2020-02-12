// implement your API here
const express = require("express");
const helpers = require("./data/db");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

server.get("/api/users", (req, res) => {
    helpers.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ errorMessage: "The users information could not be retrieved" })
        })
});

server.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    helpers.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The user information could not be retrieved" })
        })
});

server.post("/api/users", (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for user" })
    } else {
        helpers.insert(newUser)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
            })
    }
});

server.put("/api/users/:id", (req, res) => {
    const updateUser = req.body;
    const id = req.params.id;
    helpers.update(id, updateUser)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else if (!updateUser.name || !updateUser.bio) {
                res.status(400).json({ message: "The user information could not be modified" })
            } else {
                res.status(200).json(user)
            }
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
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The user could not be removed" })
        })
});

const port = 8080;
const host = "127.0.0.1";
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
});



