import dbConnect from "utils/dbConnect";
import User from "models/User";
import generateToken from "utils/generateToken";
import bcryptjs from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid credentials." });
    //check the password
    const passwordVerified = await bcryptjs.compare(password, user.password);
    if (!passwordVerified)
      return res.status(401).json({ message: "Invalid credentials." });
    await generateToken(res, 200, user);
  } else {
    return res.status(501).json({ message: "Method not implemented." });
  }
}
