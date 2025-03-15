const prisma = require("../prismaClient");

// 모든 콘텐츠 조회
const getAllContents = async (req, res) => {
  try {
    const contents = await prisma.content.findMany();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 특정 콘텐츠 조회
const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await prisma.content.findUnique({ where: { id } });

    if (!content) return res.status(404).json({ error: "Content not found" });

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 콘텐츠 추가
const createContent = async (req, res) => {
  try {
    const { text, thumbnail } = req.body;
    const content = await prisma.content.create({ data: { text, thumbnail } });
    res.json(content);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 콘텐츠 수정
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, thumbnail } = req.body;

    const updatedContent = await prisma.content.update({
      where: { id },
      data: { text, thumbnail },
    });

    res.json(updatedContent);
  } catch (error) {
    res.status(400).json({ error: "Update failed. Content may not exist." });
  }
};

// 콘텐츠 삭제
const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.content.delete({ where: { id } });
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Delete failed. Content may not exist." });
  }
};

module.exports = {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
};
