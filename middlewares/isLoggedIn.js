const jwt = require("jsonwebtoken");

const prisma = require("../prisma/index");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.json({ message: "Please log in" });
      throw new Error("You are not logged in");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    next();
  } catch (error) {
    res.json({ message: error.message });
    throw new Error(error);
  }
};

module.exports = isLoggedIn;
