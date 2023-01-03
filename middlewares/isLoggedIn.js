const jwt = require("jsonwebtoken");

const prisma = require("../prisma/index");

const loggedIn = async (req, res, next) => {
  try {
    const token = req.cookie.token;
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
    throw new Error(error);
  }
};
