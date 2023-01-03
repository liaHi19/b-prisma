const prisma = require("../prisma/index");
const cookieToken = require("../helpers/cookieToken");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw new Error("Please provide all credentials");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("This email address is already used");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    cookieToken(user, res);
  } catch (error) {
    res.json({ message: error.message });
    throw new Error(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //no user
    if (!user) {
      throw new Error("User Not Found");
    }

    //password mismatch
    if (user.password !== password) {
      throw new Error("Password isn't correct");
    }

    cookieToken(user, res);
  } catch (error) {
    res.json({ message: error.message });
    throw new Error(error);
  }
};

//logout

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true });
  } catch (error) {
    res.json({ message: error.message });
    throw new Error(error);
  }
};
