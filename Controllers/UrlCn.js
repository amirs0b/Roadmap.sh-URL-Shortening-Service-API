import Url from "../Models/UrlMd.js";
import ApiFeatures, {catchAsync, HandleERROR} from "vanta-api";

import {customAlphabet} from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);


export const createShortUrl = catchAsync(async (req, res, next) => {
    const {originalUrl} = req.body;
    const userId = req.userId
    console.log(req.body);

    if (!originalUrl) {
        return next(new HandleERROR("Original URL is required", 400))
    }
    const shortUrl = nanoid();
    const newUrl = new Url({originalUrl, shortUrl, userId});
    await newUrl.save();
    res.status(201).json({
        status: "success",
        success: true,
        data: {
            url: newUrl
        }
    })
})


export const getShortUrl = catchAsync(async (req, res, next) => {
    const {shortUrl} = req.params;
    const url = await Url.findOne({shortUrl})
    if (!url) {
        return next(new HandleERROR("URL not found", 404))
    }
    url.urlClicks++;
    await url.save();
    res.status(200).json({
        status: "success",
        success: true,
        data: {
            url
        }
    })
})


export const getUserUrls = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Url, req.query, req.role)
        .addManualFilters(req.role === 'admin' ? {} : {_id: req.userId})
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate();

    const result = await features.execute();

    res.status(200).json({
        success: true,
        data: result,
    });
});

export const getUrlStats = catchAsync(async (req, res, next) => {
    const {shortUrl} = req.params;

    const url = await Url.findOne({shortUrl});

    if (!url) {
        return next(new HandleERROR("URL not found", 404));
    }

    res.status(200).json({
        success: true,
        data: url,
    });
});

export const deleteUrl = catchAsync(async (req, res, next) => {
    const {shortUrl} = req.params;
    const userId = req.userId;
    const url = await Url.findOne({shortUrl});

    if (url.user.toString() !== userId && req.role !== 'admin') {
        return next(new HandleERROR("You are not authorized to delete this URL", 403));
    }

    if (!url) {
        return next(new HandleERROR("URL not found", 404));
    }

    await Url.deleteOne({shortUrl});
    res.status(200).json({
        success: true,
        message: "URL deleted successfully",
    });
});


export const updateUrl = catchAsync(async (req, res, next) => {
    const { shortUrl } = req.params;
    const { originalUrl } = req.body;
    const userId = req.userId;

    if (!originalUrl) {
        return next(new HandleERROR("A new original URL is required", 400));
    }

    const url = await Url.findOne({ shortUrl });
    console.log(url)

    if (!url) {
        return next(new HandleERROR("URL not found", 404));
    }

    if (url.userId.toString() !== userId && req.role !== 'admin') {
        return next(new HandleERROR("You are not authorized to update this URL", 403));
    }

    url.originalUrl = originalUrl;
    const updatedUrl = await url.save();

    return res.status(200).json({
        success: true,
        message: "URL updated successfully",
        data: updatedUrl
    });
});