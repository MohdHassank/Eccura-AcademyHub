const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// 1. Express app ko initialize karna
const app = express();
app.use(cors());

// 2. Middleware: Incoming JSON requests ko parse (read) karne ke liye
app.use(express.json());

// 3. Database connection setup (Aapke existing db.js se)
connectDB();

// 4. Base Check Route (Sirf testing ke liye ki backend chal raha hai ya nahi)
app.get("/", (req, res) => {
  res.send("AcademyHub Backend Running Successfully 🚀");
});

// 5. Authentication Routes ko Mount (Link) karna
app.use("/api/auth", authRoutes);

const studentRoutes = require("./routes/studentRoutes");

app.use("/api/student", studentRoutes);

const parentRoutes = require("./routes/parentRoutes");

const supportRoutes = require("./routes/supportRoutes");

app.use("/api/parent", parentRoutes);
app.use("/api/support", supportRoutes);

// 6. Server ki port define karna aur listen karna
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});