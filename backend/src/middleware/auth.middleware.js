import { verifyToken } from "@clerk/express";

export const productAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the JWT token using Clerk's verifyToken
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    if (!payload || !payload.sub) {
      return res
        .status(401)
        .json({ message: "Unauthorized - invalid token" });
    }

    // Set req.auth for downstream handlers
    req.auth = { userId: payload.sub, sessionId: payload.sid };
    next();
  } catch (error) {
    console.error("Auth verification error:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized - token verification failed" });
  }
};
