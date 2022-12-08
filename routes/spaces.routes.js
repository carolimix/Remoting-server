const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Spaces = require("../models/Spaces.model");

//POST /spaces/create - Creates a new Space
router.post("/spaces/create", (req, res, next) => {
    const {name, district, description, type, priceRange, openingTimes, imageUrl, website, petFriendly, extras } = req.body;

    Spaces.create({
        name,
        district, 
        description, 
        type, 
        priceRange, 
        openingTimes, 
        imageUrl, 
        website, 
        petFriendly, 
        extras
    })
    .then((response) => res.json(repsonse))
    .catch((err) => res.json(err));
});

//GET spaces - Retreives all of the spaces
router.get("/spaces", (req, res, next) => {
    Spaces.find()
    .then((allSpaces) => res.json(allSpaces))
    .catch((err) => res.json(err));
});

//GET /spaces/:spaceId - Retrieves a specific space by id
router.get("/spaces/:spaceId", (req, res, next) => {
    const { spaceId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(spaceId)) {
        res.status(400).json({ message: "Specified id is not valid"});
        return;
    }
})

//PUT /spaces/:spaceId - Update a specific project by id
router.put("/spaces/:spaceId", (req, res, next) => {
    const { spaceId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(spaceId)) {
        res.status(400).json( { message: "Specified is not valid"});
        return;
    }

    Spaces.findByIdAndUpdate(spaceId, req.body, { new : true})
    .then((updatedSpace) => res.json(updatedSpace))
    .catch((error) => res.json(error));
});

//DELETE /spaces/:spaceId - Deletes a specific space by id
router.delete("/spaces/:spaceId", ( req, res, next) => {
    const { spaceId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(spaceId)){
        res.status(400).json({ message: "Specified id is not valid"});
        return;
    }

    Spaces.findByIdAndRemove(spaceId)
    .then(() => res.json({ message: `Space with ${spaceId} was removed successfully.` })
   )
    .catch((error) => res.json(error));
});

module.exports = router;