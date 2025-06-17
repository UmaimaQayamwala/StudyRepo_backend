// import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const isAdmin = (req, res, next) => {
    if (req.user?.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  };
  