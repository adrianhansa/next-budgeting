// import jwt from 'jsonwebtoken';
import * as jose from "jose";
import { serialize } from "cookie";

export default async function generateToken(res, statusCode, user) {
  const token = await new jose.SignJWT({
    id: user._id,
    accessLevel: user.accessLevel,
    company: user.company,
    service: user.service,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  if (!token) return res.status(400).json({ message: "Token not generated" });
  const serialized = serialize("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development" && true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 30,
    path: "/",
  });
  res.status(statusCode).setHeader("Set-Cookie", serialized).json({
    id: user._id,
    accessLevel: user.accessLevel,
    name: user.name,
    service: user.service,
  });
}
