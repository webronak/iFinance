require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const path = require("path");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// middleware
app.use(express.json());

// production assests
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      // routes
      app.use("/api/income", incomeRoutes);
      app.use("/api/expense", expenseRoutes);
      app.use("/api/user", userRoutes);
      console.log("hello from server");
    });
  })
  .catch((err) => {
    console.log("MongoDB not connected", err);
  });
