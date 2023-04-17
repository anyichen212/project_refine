import List from "../mongodb/models/list.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllList = async (req, res) => {
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
    } = req.query;

    const query = {};


    if (title_like) {
        query.title = { $regex: title_like, $options: "i" };
    }

    try {
        const count = await List.countDocuments({ query });

        const lists = await List.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getListDetail = async (req, res) => {
    const { id } = req.params;
    const listExists = await List.findOne({ _id: id }).populate(
        "creator",
    );

    if (listExists) {
        res.status(200).json(listExists);
    } else {
        res.status(404).json({ message: "List not found" });
    }
};

const createList = async (req, res) => {
    try {
        const {
            title,
            description,
            image,
            email,
        } = req.body;

        //start a new session, mongoose special session
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

        const imageUrl = await cloudinary.uploader.upload(image);

        const newList = await List.create({
            title,
            description,
            image: imageUrl.url,
            creator: user._id,
        });

        user.allList.push(newList._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "List created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image} =
            req.body;

        const imageUrl = await cloudinary.uploader.upload(image);

        await List.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                image: imageUrl.url || image,
            },
        );

        res.status(200).json({ message: "List updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteList = async (req, res) => {
    try {
        const { id } = req.params;

        const listToDelete = await List.findById({ _id: id }).populate(
            "creator",
        );

        if (!listToDelete) throw new Error("List not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        listToDelete.deleteOne({ session });
        listToDelete.creator.allList.pull(listToDelete);

        await listToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "List deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllList,
    getListDetail,
    createList,
    updateList,
    deleteList,
};