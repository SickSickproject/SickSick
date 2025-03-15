const express = require("express");
const {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

const router = express.Router();

router.get("/", getAllContents);
router.get("/:id", getContentById);
router.post("/", createContent);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);

module.exports = router;
