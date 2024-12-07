import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required!"],
        },
        description: {
            type: String,
            required: [true, "Description is required!"],
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("blog", blogSchema,'blogs');