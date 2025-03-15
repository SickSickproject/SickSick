const express = require("express");
const contentRoutes = require("./routes/contentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
app.use("/contents", contentRoutes);
app.use("/admins", adminRoutes);

module.exports = app;
