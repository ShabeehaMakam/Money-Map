import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  // Extract token from Authorization header 'Bearer <token>'
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token with secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded id and exclude password field
    req.user = await User.findById(decoded.id).select('-password');

    // Call next middleware or route handler
    next();

  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
