import Subscribe from "../models/Subscribe.js";
import validator from "validator";

export const subscribe = async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json("Email not valid");
    }
    const user = await Subscribe.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json("User has been subscribe");
    }
    const sub = new Subscribe(req.body);
    const response = await sub.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
