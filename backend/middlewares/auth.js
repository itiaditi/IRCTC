const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization').split(' ')[1];
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }
    const token = authHeader;
    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }
    try {
        jwt.verify(token, "masai", (err, decoded) => {
            if (err) {
                console.log("val",decoded);
                return res.status(400).json({ error: 'Invalid token' });
            }
            console.log("decode" ,decoded);
            req.user = {
                id: decoded.id,
                role: decoded.role
            };
            console.error('Token is missing id or role:', decoded);
            next();
        });
    } catch (error) {
        
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = {
    authenticateToken
};