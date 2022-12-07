const { Schema, model } = require("mongoose");

const spacesSchema = new Schema(
    {
        name: String,
        district: String,
        description: String,
        type: {
            public: {type: Boolean, required: true, default: true},
            private: {type: Boolean, required: true, default: true}
        },
        priceRange: {
            enum: ["$", "$$", "$$$"]
                 },
        openingTimes: { 
            days: [],
            open: String, 
            close: String,
        },
        imageUrl: String,
        website: String,
        extras: String,
        petFriendly: Boolean       
    
    }
);

const Spaces = model("Spaces", spacesSchema);
module.exports = Spaces;