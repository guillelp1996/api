const jwt = require("jsonwebtoken");

const validateAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res
        .status(400)
        .json({ status: "bad", message: "Missing authorization header" });
    }

    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer" || !token) {
      res.status(400).json({ status: "bad", message: "Invalid token format" });
    }

    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);

    req.auth = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAuth;
