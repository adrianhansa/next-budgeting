import { NextResponse } from "next/server";
import * as jose from "jose";

const middleware = async (req) => {
  const { origin } = req.nextUrl;
  const url = req.url;
  const token = req.cookies.authToken;

  const verifiedUser =
    token &&
    (await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    ));

  const protectedRoutes = [
    { accessLevel: 1, name: "/dashboard" },
    { accessLevel: 2, name: "/about" },
    { accessLevel: 1, name: "/api/profile" },
  ];

  req.user = verifiedUser;

  for (let i = 0; i < protectedRoutes.length; i += 1) {
    if (url.includes(protectedRoutes[i].name)) {
      if (!verifiedUser) {
        return NextResponse.redirect(`${origin}/login`);
      }
      return NextResponse.next();
    }
  }
};

export default middleware;
