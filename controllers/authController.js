import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });
    const pass = req.body.password;
    if (user) {
      return res.status(400).json(`${req.body.username} all ready in use!`);
    }
    if (email) {
      return res.status(400).json(`${req.body.email} all ready in use!`);
    }
    if (pass !== req.body.confirmPassword) {
      return res.status(400).json(`Confirm password not match!`);
    }
    if (pass.length < 6) {
      return res.status(400).json(`Password must +6 character`);
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const savedUser = await newUser.save();
    const { password, ...otherDetails } = savedUser._doc;
    res.status(200).send({ otherDetails });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json(`Username or email notfound!`);
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT, {
      expiresIn: "3d",
    });

    const { password, role, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails, role } });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .cookie("access_token", "", { expires: new Date(0) })
      .status(200)
      .json("User has been logout!");
  } catch (error) {
    res.status(500).json(error);
  }
};
