import express from "express"
import { loginUser, logoutUser, registerUser, uploadImage } from "../controllers/users.controllers.js";
import { upload } from "../middlewares/multer.middelware.js";

const userRouter = express.Router();

//register User
userRouter.post("/register", registerUser)

//login User
userRouter.post("/login", loginUser)

//logout User
userRouter.post("/logout", logoutUser)

//Image
userRouter.post("/image", upload.single("image"), uploadImage)

export { userRouter }