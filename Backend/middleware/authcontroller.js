import jwt from "jsonwebtoken"
let jwtKey = "iamyou";

const authMiddleware = (req, res, next) => {
    console.log("Authorization header:", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("Extracted token:", token);

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, jwtKey);
        // console.log("Decoded JWT:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        // console.error("JWT verification error:", err.message);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
export {
    authMiddleware
}