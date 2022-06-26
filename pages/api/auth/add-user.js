import User from "models/User";
import dbConnect from "utils/dbConnect";
import { protect } from "utils/protect";

const handler = async (req, res) => {
  if (req.method === "POST") {
    dbConnect();
    try {
      const { name, email, password, passwordVerify } = req.body;
      if (!name || !email || !password)
        return res.status(400).json({ message: "All fields are required" });
      if (password.length < 6)
        return res
          .status(400)
          .json({
            message: "The password must contain at least 6 characters.",
          });
      if (password !== passwordVerify)
        return res
          .status(400)
          .json({ message: "The two passwords do not match" });
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({
          message: "This email has already been registered. Please login.",
        });
      const user = await User.create({
        name,
        email,
        isAdmin: false,
        password,
        household: req.user.household,
      });
      //send activation email
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(501).json({ message: "Method not implemented." });
  }
};

export default protect(handler);
