import User from "../Models/UserMd.js";
import bcrypt from "bcryptjs";
import ApiFeatures, {catchAsync, HandleERROR} from "vanta-api";


export const getAllUsers = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req?.query, req?.role)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()

    const result = await features.execute();
    return res.status(200).json({success: true, message: "success", result})
})


export const getOneUser = catchAsync(async (req, res, next) => {
    const feature = new ApiFeatures(User, req?.query, req?.role)
        .addManualFilters(req.role === 'admin' ? {} : {_id: req.userId})
        .filter()
        .limitFields()
        .sort()
        .paginate()
        .populate()
    const result = await feature.execute(req.params.id);

    return res.status(200).json({success: true, message: "success", result})
})


export const updateUser = catchAsync(async (req, res, next) => {
    if (req?.role !== 'admin' && req?.userId !== req?.params?.id) {
        return next(new HandleERROR("You are not allowed to update this user", 403))
    }
    const user = await User.findById(req.params.id);
    user.username = req?.body?.username || user.username;
    user.password = req?.body?.password ? bcrypt.hash(req?.body?.password, 10) : user.password
    user.role = req?.body?.role && req.role === "admin" ? req?.body?.role : user?.role
    const newUser = await user.save();
    return res.status(200).json({success: true, message: "user updated successfully", newUser})
})