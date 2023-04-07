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
        propertyType = "",
    } = req.query;

    const query = {};

    if (propertyType !== "") {
        query.propertyType = propertyType;
    }

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

};

const deleteList = async (req, res) => {
 
};

export {
    getAllList,
    getListDetail,
    createList,
    updateList,
    deleteList,
};