import jwt from 'jsonwebtoken'
const exportValidation = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        const { role = null, id = null } = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.role = role;
        req.userId = id;
    } catch (error) {
        req.role = null;
        req.userId = null;
    }
    next();
};

export default exportValidation;
