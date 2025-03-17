import express from "express";

import db from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();


// get all main posts
router.get("/", async (req, res) => {
    let collection = await db.collection("posts");
    let posts = await collection.find({}).limit(16).toArray();
    res.status(200).send(posts);
});

// get all posts by user
router.get("/:id", async (req, res) => {
    let collection = await db.collection("posts");
    let query = { _id: new ObjectId(req.params.id)};
    let result = await collection.find(query).toArray();

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
});

//post new post
router.post("/", async (req, res) => {
    console.log("POST request received at /post endpoint");
    try{
        //hero
        console.log("Received request body:", req.body);
        const {postImage, user, description} = req.body;
        let newDocument = {
            user,
            postImage,
            description,
            // hero
        }
        let collection = await db.collection("posts");
        let result = await collection.insertOne(newDocument);

        res.status(200).send(result);
    }
    catch (err){
        console.log(err);
        res.status(500).send("Error adding");
    }
});

export default router;