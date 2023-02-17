import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, process.env.JWT, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json("Plese login to your account!");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json("Plese login to your account!");
  }
};

export const adminOnly = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, process.env.JWT, async (err, decodedToken) => {
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
