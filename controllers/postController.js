const prisma = require("../prisma/index");

exports.createPost = async (req, res, next) => {
  try {
    const { slug, title, body, authorId } = req.body;

    if (!slug || !title || !body || !authorId) {
      throw new Error("Please provide all credentials");
    }

    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: { connect: { id: authorId } },
      },
    });

    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
    throw new Error(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const result = await prisma.post.update({
      where: { id },
      data: { title, body },
    });

    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
    throw new Error(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await prisma.post.delete({
      where: { id },
    });
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
    throw new Error(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const result = await prisma.post.deleteMany();
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
    throw new Error(error);
  }
};
