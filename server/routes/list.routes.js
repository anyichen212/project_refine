import express from 'express';

import {
    createList, deleteList, getAllList, getListDetail, updateList
} from "../controllers/list.controller.js";

const router = express.Router();

router.route("/").get(getAllList);
router.route("/:id").get(getListDetail);
router.route("/").post(createList);
router.route("/:id").patch(updateList);
router.route("/:id").delete(deleteList);

export default router;