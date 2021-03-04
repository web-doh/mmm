import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      errorMessage: "Unauthorized user!",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    console.error("authentication error", err);
    res.status(403).json({
      success: false,
      errorMessage: "Invalid token.",
    });
  }
};
