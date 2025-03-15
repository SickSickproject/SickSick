const prisma = require("../prismaClient");

// 모든 관리자 조회 (비밀번호 제외)
const getAllAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, name: true, login_id: true },
    });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 특정 관리자 조회 (비밀번호 제외)
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await prisma.admin.findUnique({
      where: { id },
      select: { id: true, name: true, login_id: true },
    });

    if (!admin) return res.status(404).json({ error: "Admin not found" });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 관리자 추가
const createAdmin = async (req, res) => {
  try {
    const { name, login_id, password } = req.body;

    const admin = await prisma.admin.create({
      data: { name, login_id, password },
    });

    res.json({ id: admin.id, name: admin.name, login_id: admin.login_id });
  } catch (error) {
    res.status(400).json({ error: "Create failed. Login ID may already exist." });
  }
};

// 관리자 정보 수정 (비밀번호는 수정하지 않음)
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, login_id } = req.body;

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: { name, login_id },
      select: { id: true, name: true, login_id: true },
    });

    res.json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ error: "Update failed. Admin may not exist or login_id is already taken." });
  }
};

// 관리자 삭제
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.admin.delete({ where: { id } });
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Delete failed. Admin may not exist." });
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
