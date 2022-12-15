const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const Spaces = require("../models/Spaces.model");
const User = require("../models/User.model");

//POST /spaces/create - Creates a new Space
router.post("/spaces/create", (req, res, next) => {
  const {
    name,
    district,
    description,
    type,
    priceRange,
    openingTimes,
    imageUrl,
    website,
    petFriendly,
    extras,
  } = req.body;

  Spaces.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.post("/addfavorite", async (req, res, next) => {
  if (!req.body) {
    next(new Error("No favorite added!"));
    return;
  }
  const { user, spaceId } = req.body; 
  try {
    const updatedUser = await User.findById(user._id);
    updatedUser.likedSpaces.push(spaceId);
    await updatedUser.save();
    res.json(updatedUser);
   }
  catch(error) {console.log(error)}
});


//GET spaces - Retreives all of the spaces
router.get("/spaces", (req, res, next) => {
  Spaces.find()
    .then((allSpaces) => res.json(allSpaces))
    .catch((err) => res.json(err));
});

//Image upload route
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.path });
});

//GET /spaces/:spaceId - Retrieves a specific space by id
router.get("/spaces/:spaceId", (req, res, next) => {
  const { spaceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(spaceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Spaces.findById(spaceId)
    .then((space) => {
      res.status(200).json(space);
    })
    .catch((err) => next(err));
});

//PUT /spaces/:spaceId - Update a specific project by id
router.put("/spaces/:spaceId", (req, res, next) => {
  const { spaceId } = req.params;
  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(spaceId)) {
    res.status(400).json({ message: "Specified is not valid" });
    return;
  }

  Spaces.findByIdAndUpdate(spaceId, req.body, { new: true })
    .then((updatedSpace) => res.json(updatedSpace))
    .catch((error) => res.json(error));
});

//add like

router.put("/:spaceId/addlike", async (req, res, next) => {
  const { username } = req.body;
  console.log(username);
  console.log(req.params.spaceId);
  try {
    const likedSpace = await Spaces.findByIdAndUpdate(req.params.spaceId);
    likedSpace.likes.push(username);
    await likedSpace.save();
    res.json(likedSpace);
  } catch (error) {
    console.log(error);
  }

  /* .then(project => {
    console.log("ok")
    res.json(project)
 })
 .catch((error) => res.json(error)) */
});

//DELETE /spaces/:spaceId - Deletes a specific space by id
router.delete("/spaces/:spaceId", (req, res, next) => {
  const { spaceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(spaceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Spaces.findByIdAndRemove(spaceId)
    .then(() =>
      res.json({ message: `Space with ${spaceId} was removed successfully.` })
    )
    .catch((error) => res.json(error));
});

router.get("/user/:userId", (req, res, next) => {
const { userId } = req.params;
 User.findById(userId)
 .populate("likedSpaces")
 .then((userReturnedFromDB) => {
  console.log(userReturnedFromDB)
  res.status(200).json(userReturnedFromDB);
})
.catch((err) => next(err));
})


module.exports = router;
