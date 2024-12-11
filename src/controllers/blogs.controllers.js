import mongoose from "mongoose";
import blogModel from "../models/blogs.models.js";

const addBlog = async (req, res) => {
    try {
        const { title, description, author } = req.body;
        if (!title || !description || !author) {
            return res.status(400).json({ message: "Blog title,description and user email is required!" });
        }
        const newblog = await blogModel.create({ title, description, author })
        res.status(201).json({
            message: "Blog added",
            status: 201,
            blog: newblog,
        })
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while adding the blog",
            error: error.message,
        })
    }
}


//gets all Blogs
const allBlogs = async (req, res) => {
    try {
        const allBlogs = await blogModel.find({});
        res.status(200).json({
            message: "All Blogs",
            allBlogs,
        })
    } catch (error) {
        res.status(500).json({
            message: "Could not fetch all Blogs",
            error: error.message
        })
    }
}


//gets single blog
const singleUserBlogs = async (req, res) => {
    const { author } = req.body;
    if (!author || !mongoose.Types.ObjectId.isValid(author)) {
        return res.status(400).json({
            message: "Invalid author ID",
            status: 400
        })
    }
    try {
        const getSingleUserBlogs = await blogModel.findOne({ author })
        if (!getSingleUserBlogs) {
            return res.status(404).json({
                message: "No blogs found",
                status: 404
            });
        }
        res.status(200).json({
            status: 200,
            blogs: getSingleUserBlogs
        })
    } catch (error) {
        res.status(500).json({
            message: "Could not fetch single user blogs",
            error: error.message
        })
    }
}


//deletes Blogs
const deleteBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID",
            status: 400
        })
    }
    try {
        const deletedblog = await blogModel.findByIdAndDelete(id)
        if (!deletedblog) {
            res.status(404).json({
                message: "blog not found",
            })
        }
        res.status(200).json({
            message: "blog deleted successfully",
            status: 200,
            data: deletedblog
        });
    } catch (error) {
        res.status(500).json({
            message: "Could not delete blog",
            error: error.message
        })
    }
}


//edits Blogs
const editBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID!"
        })
    }
    if (!title || !description) {
        res.status(400).json({
            message: "Title and description not provided!"
        })
        return
    }
    try {
        const updatedblog = await blogModel.findByIdAndUpdate(id,
            { title, description }, { new: true, runValidators: true })
        if (!updatedblog) {
            return res.status(404).json({
                message: "blog not found",
                status: 404
            });
        }
        res.status(200).json({
            message: "blog updated",
            status: 200,
            updatedblog,
        })
    } catch (error) {
        res.status(500).json({
            message: "Could not update blog",
            error: error.message
        })
    }
}

export { addBlog, allBlogs, editBlog, singleUserBlogs, deleteBlog }