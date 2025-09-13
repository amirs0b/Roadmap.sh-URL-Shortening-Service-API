import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import isLogin from "../Middlewares/IsLogin.js";
import {getAllUsers, getOneUser, updateUser} from "../Controllers/UserCn.js";

const userRouter = express.Router();
userRouter.route('/').get(isAdmin, getAllUsers);
userRouter.route('/:id').get(isLogin, getOneUser).patch(isLogin, updateUser);

export default userRouter;