import User from "models/User";
import dbConnect from "utils/dbConnect";
import { protect } from "utils/protect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    dbConnect();
    try {
      if (req.user.isAdmin) {
        const users = await User.find({ household: req.user.household._id });
        res.status(200).json({ users });
      } else {
        return res
          .status(403)
          .json({
            message: "You are not authorized to perform his operation.",
          });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(501).json({ message: "Method not implemented." });
  }
};

export default protect(handler);
