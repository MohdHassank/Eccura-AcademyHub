const { sql } = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    const { id } = req.params;

    const request = new sql.Request();

    const result = await request
      .input("StudentId", sql.Int, id)
      .query(`
        SELECT TOP 1 *
        FROM DashboardStats
        WHERE studentId = @StudentId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Dashboard data not found"
      });
    }

    return res.status(200).json({
      success: true,
      dashboard: result.recordset[0]
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboard
};