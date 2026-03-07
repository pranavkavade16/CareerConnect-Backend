require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");

const jobRoutes = require("./routes/jobRoutes");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

(async () => {
  try {
    await initializeDatabase();

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start the server", error);
    process.exit(1);
  }
})();

// routes

app.use("/job", jobRoutes);

module.exports = app;
