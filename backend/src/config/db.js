const sql = require("mssql");

const config = {
  server: "localhost",
  database: "AcademyHubDB",

  user: "academyhub",
  password: "Academy@123",

  options: {
    trustServerCertificate: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("✅ SQL Server Connected");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
  }
};

module.exports = { connectDB, sql };