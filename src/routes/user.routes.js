import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",   // so the front-end field "must" be named "avatar"
            maxCount: 1,   //how many fiels to accept under the same name "avatar"
        },
        {
            name: "coverImage",   // so the front-end field "must" be named "coverImage"
            maxCount: 1,   //how many fiels to accept under the same name "coverImage"
        }
    ]),
    registerUser
);




export default router;