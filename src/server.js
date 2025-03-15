require("dotenv").config();
const app = require("./app");
const prisma = require("./prismaClient");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
