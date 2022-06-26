import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      res
        .setHeader(
          "Set-Cookie",
          serialize("authToken", "", { maxAge: -1, path: "/" })
        )
        .json({});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(501).json({ message: "Invalid request method." });
  }
}
