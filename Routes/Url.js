import express from "express";
import {
    createShortUrl,
    deleteUrl,
    getUserUrls,
    getUrlStats,
    updateUrl, getShortUrl,
} from "../Controllers/UrlCn.js";
import isLogin from "../Middlewares/IsLogin.js";

const urlRouter = express.Router();

urlRouter.route("/:shortUrl").get(getShortUrl);
urlRouter.route("/")
    .post(isLogin, createShortUrl)
    .get(isLogin, getUserUrls);

urlRouter.route("/:shortUrl/stats").get(isLogin, getUrlStats);

urlRouter.route("/:shortUrl/manage")
    .patch(isLogin, updateUrl)
    .delete(isLogin, deleteUrl);


export default urlRouter;
