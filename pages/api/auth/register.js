import User from "models/User";
import Household from "models/Household";
import dbConnect from "utils/dbConnect";
import generateToken from "utils/generateToken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();
    try {
      const { household, name, email, password, passwordVerify } = req.body;
      if (!name || !email || !password || !household)
        return res.status(400).json({ message: "All fields are required" });
      if (password.length < 6)
        return res.status(400).json({
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
        isAdmin: true,
        password,
      });
      const householdCreated = await Household.create({
        owner: user._id,
        name: household,
      });
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { household: householdCreated._id },
        { new: true }
      ).populate("household");
      await generateToken(updatedUser, 200, res);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(501).json({ message: "Method not implemented." });
  }
}
