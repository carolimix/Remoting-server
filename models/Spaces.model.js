const { Schema, model } = require("mongoose");

const spacesSchema = new Schema(
    {
        name: String,
        district: String,
        description: String,
        type: String,
        priceRange: String,
        openingTimes: String,
        imageUrl: String,
        website: String,
        petFriendly: String,      
        extras: String,
        added_by: String,
        likes: Array, 

    },
    {
    timestamps: true,
    }
);

const Spaces = model("Spaces", spacesSchema);
module.exports = Spaces;