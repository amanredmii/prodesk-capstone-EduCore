const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        thumbnail: {
            type: String,
            default: "",
        },

        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        isDefault: {
            type: Boolean,
            default: false,
        },

        category: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Course", courseSchema);