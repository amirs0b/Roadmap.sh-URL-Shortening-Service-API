import User from "./../Models/UserMd.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { catchAsync,HandleERROR } from "vanta-api";
export const login = catchAsync(async (req, res, next) => {
    const { username = null, password = null } = req.body;
    if (!username || !password) {
        return  next(new HandleERROR('Username and password are required', 400))
    }
    const user = await User.findOne({ username });
    if (!user) {
        return next(new HandleERROR('User not found', 404))
    }
    const confirmPass = bcryptjs.compareSync(password, user.password);
    if (!confirmPass) {
        return next(new HandleERROR('Invalid username or password', 401))
    }
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
    );
    return res.status(200).json({
        success:true,
        message:'Login successful',
        data:{
            token,
            user:{
                id:user._id,
                username:user.username,
                role:user.role
            }
        }
    })
});

export const register=catchAsync(async (req,res,next) => {
    const { username = null, password = null } = req.body;
    if (!username || !password) {
        return  next(new HandleERROR('Username and password are required', 400))
    }
    const passReg=new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    if (!passReg.test(password)) {
        return next(new HandleERROR('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number', 400))
    }
    const hashPassword=bcryptjs.hashSync(password, 10)
    await User.create({ username, password: hashPassword })
    return res.status(201).json({
        success:true,
        message:'User registered successfully',
    })
})