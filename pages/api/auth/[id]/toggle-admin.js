import User from "models/User";
import dbConnect from "utils/dbConnect";
import { protect } from "utils/protect";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    dbConnect();
    try {
      if (req.user.isAdmin) {
        const user = await User.findOne({
          household: req.user.household._id,
          _id: req.query.id,
        });
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
        const userDeleted = await User.findByIdAndDelete(user._id);
        res.status(200).json(userDeleted);
      } else {
        return res.status(403).json({
          message: "You are not authorized to perform this operation.",
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
