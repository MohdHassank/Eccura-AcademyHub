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

const getNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const request = new sql.Request();

    const result = await request
      .input("StudentId", sql.Int, id)
      .query(`
        SELECT *
        FROM Notes
        WHERE studentId = @StudentId
        ORDER BY id DESC
      `);

    return res.status(200).json({
      success: true,
      notes: result.recordset
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAssignments = async (req, res) => {
  try {

    const { id } = req.params;

    const request = new sql.Request();

    const result = await request
      .input("StudentId", sql.Int, id)
      .query(`
        SELECT *
        FROM Assignments
        WHERE studentId = @StudentId
        ORDER BY id DESC
      `);

    return res.status(200).json({
      success: true,
      assignments: result.recordset
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getpreviousPapers = async (req, res) => {
  try {

    const { id } = req.params;

    const request = new sql.Request();

    const result = await request
      .input("StudentId", sql.Int, id)
      .query(`
        SELECT *
        FROM previousPapers
        WHERE studentId = @StudentId
        ORDER BY year DESC
      `);

    return res.status(200).json({
      success: true,
      papers: result.recordset
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getRecordedLectures = async (req, res) => {
  try {

    const { id } = req.params;

    const request = new sql.Request();

    const result = await request
      .input("StudentId", sql.Int, id)
      .query(`
        SELECT *
        FROM RecordedLectures
        WHERE studentId = @StudentId
        ORDER BY id DESC
      `);

    return res.status(200).json({
      success: true,
      lectures: result.recordset
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getSyllabusTracker = async (req,res) => {

  try {

    const { id } = req.params;

    const request = new sql.Request();

    const result = await request
      .input("StudentId", sql.Int, id)
      .query(`
        SELECT *
        FROM SyllabusTracker
        WHERE studentId = @StudentId
      `);

    return res.status(200).json({
      success:true,
      syllabus: result.recordset
    });

  } catch(error){

    return res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

module.exports = {
  getDashboard,
  getNotes,
  getAssignments,
  getpreviousPapers,
    getRecordedLectures,
    getSyllabusTracker
};