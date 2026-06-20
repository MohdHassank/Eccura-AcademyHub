const { sql } = require("../config/db");

const getParentDashboard = async (req, res) => {
  try {
    const { parentId } = req.params;

    // Linked student nikalo
    const linkedStudent = await new sql.Request()
      .input("ParentId", sql.Int, parentId)
      .query(`
        SELECT studentId
        FROM ParentChildren
        WHERE parentId = @ParentId
      `);

    if (linkedStudent.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No child linked"
      });
    }

    const studentId = linkedStudent.recordset[0].studentId;

    // Parent details
    const parentData = await new sql.Request()
      .input("ParentId", sql.Int, parentId)
      .query(`
        SELECT
          id,
          fullName,
          email
        FROM Students
        WHERE id = @ParentId
      `);

    // Student details + Academic Info
    const studentData = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT
          id,
          fullName,
          email,
          class_name,
          roll_number,
          subjects
        FROM Students
        WHERE id = @StudentId
      `);

    if (studentData.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const student = studentData.recordset[0];

    return res.status(200).json({
      success: true,

      parent: parentData.recordset[0],

      student: {
        id: student.id,
        fullName: student.fullName,
        email: student.email,
        class_name: student.class_name,
        roll_number: student.roll_number,
        subjects: student.subjects
          ? student.subjects.split(",")
          : []
      }
    });

  } catch (error) {

    console.log("Parent Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
const getChildPerformance = async (req, res) => {
  try {

    const { parentId } = req.params;

    // Parent se linked student nikalo
    const linkedStudent = await new sql.Request()
      .input("ParentId", sql.Int, parentId)
      .query(`
        SELECT studentId
        FROM ParentChildren
        WHERE parentId = @ParentId
      `);

    if (linkedStudent.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No child linked"
      });
    }

    const studentId = linkedStudent.recordset[0].studentId;

const studentInfo = await new sql.Request()
  .input("StudentId", sql.Int, studentId)
  .query(`
    SELECT subjects
    FROM Students
    WHERE id = @StudentId
  `);
    // Subject Performance
    const performance = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT *
        FROM ChildPerformance
        WHERE studentId = @StudentId
      `);

     const allowedSubjects =
  studentInfo.recordset[0]?.subjects
    ?.split(",")
    .map(subject => subject.trim()) || [];

// Existing performance ko map bana do
const performanceMap = {};

performance.recordset.forEach(item => {
  performanceMap[item.subjectName] = item;
});

// Final merged data
const mergedPerformance = allowedSubjects.map(subject => {

  if (performanceMap[subject]) {
    return performanceMap[subject];
  }

  return {
    id: null,
    studentId,
    subjectName: subject,
    marks: "--",
    totalMarks: 100,
    grade: "--",
    status: "Not Evaluated"
  };
});
    // Weak Subjects
    const weakSubjects = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT *
        FROM WeakSubjects
        WHERE studentId = @StudentId
      `);

    // Progress Trends
    const progressTrends = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT *
        FROM ProgressTrends
        WHERE studentId = @StudentId
      `);

    return res.status(200).json({
      success: true,

      performance: mergedPerformance,

      weakSubjects: weakSubjects.recordset,

      progressTrends: progressTrends.recordset
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
  getParentDashboard,
  getChildPerformance
};