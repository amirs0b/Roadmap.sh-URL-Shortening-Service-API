const isAdmin = (req, res, next) => {
    if(req.role!=='admin'){
        return res.status(403).json({
            success: false,
            message: "You don't have permission to perform this action"
        });
    }
    next();
}

export default isAdmin;