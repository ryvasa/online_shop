import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, `${process.env.JWT}`, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.email = decoded.email;
    next();
  });
};

export const adminOnly = async (req, res, next) => {
  const token = req.cookies.refresh_token;
  if (token) {
    jwt.verify(token, process.env.JWT_REFRESH, async (err, decodedToken) => {
      if (err) {
        res.status(404).json(err.message).local.user = null;
        next();
      } else {
        let user = await Users.findById(decodedToken.id);
        res.locals.user = user;
        if (user.role === "admin") {
          next();
        } else {
          res.status(401).json("Access denied!");
        }
      }
    });
  } else {
    res.status(401).json("Plese login to your account!");
  }
};
