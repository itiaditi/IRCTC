const checkRole = (roles) => {
    return (req, res, next) => {
        console.log("Checking role for user:", req.user);
        const userRole = req.user.role;
        console.log(userRole); // Assuming req.user is set after authentication
        if (roles.includes(userRole)) {
            return next();
        } else {
            
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
};

module.exports = {checkRole};