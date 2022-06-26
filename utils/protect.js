import * as jose from "jose";

export const protect = (handler) => {
  return async (req, res) => {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(403).json({ message: "Missing token" });
    }
    const userVerified = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if (!userVerified) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (userVerified.payload.accessLevel < accessLevelRequired) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this resource." });
    }
    req.user = userVerified.payload;
    return handler(req, res);
  };
};
