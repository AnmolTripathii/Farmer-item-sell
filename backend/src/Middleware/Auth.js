// Middleware/Auth.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    const bearerToken = token.split(" ")[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};


export default verifyToken;
