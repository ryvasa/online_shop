import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401);
    }
    const user = await User.findOne({ refresh_token: refreshToken });
    if (!user) {
      return res.status(403);
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH,
      async (err, decodedToken) => {
        if (err) {
          return res.status(403);
        }
        const accessToken = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT,
          {
            expiresIn: "15s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
