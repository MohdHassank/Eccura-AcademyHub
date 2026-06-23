const { sql } = require("../config/db");

const getParentDashboard = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Linked student nikalo
    // const linkedStudent = await new sql.Request()
    //   .input("ParentId", sql.Int, parentId)
    //   .query(`
    //     SELECT studentId
    //     FROM ParentChildren
    //     WHERE parentId = @ParentId
    //   `);

    // if (linkedStudent.recordset.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No child linked"
    //   });
    // }

    // const studentId = linkedStudent.recordset[0].studentId;

    // Parent details
    // const parentData = await new sql.Request()
    //   .input("ParentId", sql.Int, parentId)
    //   .query(`
    //     SELECT
    //       id,
    //       fullName,
    //       email
    //     FROM Students
    //     WHERE id = @ParentId
    //   `);

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

    const performanceData = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
    SELECT TOP 3
      subjectName,
      marks,
      status
    FROM ChildPerformance
    WHERE studentId = @StudentId
    ORDER BY marks DESC
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

  student: {
    id: student.id,
    fullName: student.fullName,
    email: student.email,
    class_name: student.class_name,
    roll_number: student.roll_number,
    subjects: student.subjects
      ? student.subjects.split(",")
      : []
  },

  performance: performanceData.recordset
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

    const { studentId } = req.params;

    // Student Subjects
    const studentInfo = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT subjects
        FROM Students
        WHERE id = @StudentId
      `);

    if (studentInfo.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // Child Performance
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

    // Existing Performance Map
    const performanceMap = {};

    performance.recordset.forEach(item => {
      performanceMap[item.subjectName] = item;
    });

    // Merge Subjects + Performance
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

    console.log("Child Performance Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getLinkedChildren = async (req, res) => {
  try {

    const { parentId } = req.params;

    const result = await new sql.Request()
      .input("ParentId", sql.Int, parentId)
      .query(`
        SELECT
          s.id,
          s.fullName,
          s.class_name
        FROM ParentChildren pc
        INNER JOIN Students s
          ON pc.studentId = s.id
        WHERE pc.parentId = @ParentId
      `);

    return res.status(200).json({
      success: true,
      children: result.recordset
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getAcademicTracking = async (req, res) => {
  try {

    const { studentId } = req.params;

    // Completed Homework
    const completedHomework = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT TOP 5 *
        FROM Assignments
        WHERE studentId = @StudentId
        AND status = 'Submitted'
        ORDER BY dueDate DESC
      `);

    // Pending Assignments
    const pendingAssignments = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT TOP 5 *
        FROM Assignments
        WHERE studentId = @StudentId
        AND status = 'Pending'
        ORDER BY dueDate ASC
      `);

    // Upcoming Tests
    const upcomingTests = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT *
        FROM MockTests
        WHERE studentId = @StudentId
        ORDER BY liveTill ASC
      `);

    // Notes
    const notes = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT TOP 5 *
        FROM Notes
        WHERE studentId = @StudentId
        ORDER BY uploadDate DESC
      `);

    return res.status(200).json({
      success: true,

      completedHomework:
        completedHomework.recordset,

      pendingAssignments:
        pendingAssignments.recordset,

      upcomingTests:
        upcomingTests.recordset,

      notes:
        notes.recordset
    });

  } catch (error) {

    console.log(
      "Academic Tracking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getFeesSummary = async (req, res) => {
  try {

    const { studentId } = req.params;

    const feesData = await new sql.Request()
      .input("StudentId", sql.Int, studentId)
      .query(`
        SELECT *
        FROM FeesSummary
        WHERE studentId = @StudentId
      `);

    if (feesData.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Fees record not found"
      });
    }

    const fees = feesData.recordset[0];

    const paidPercentage =
      fees.totalFees > 0
        ? Math.round((fees.paidAmount / fees.totalFees) * 100)
        : 0;

    return res.status(200).json({
      success: true,
      fees: {
        totalFees: fees.totalFees,
        paidAmount: fees.paidAmount,
        pendingAmount: fees.pendingAmount,
        scholarshipAmount: fees.scholarshipAmount,
        paidPercentage
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getParentProfile = async (req, res) => {
  try {

    const { parentId } = req.params;

    const result = await new sql.Request()
      .input("ParentId", sql.Int, parentId)
      .query(`
        SELECT
          id,
          fullName,
          email,
          phone
        FROM Students
        WHERE id = @ParentId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Parent not found"
      });
    }

    return res.status(200).json({
      success: true,
      parent: result.recordset[0]
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getParentNotifications = async (req, res) => {

  try {

    const { studentId } = req.params;

    const notices = await new sql.Request()
  .input("StudentId", sql.Int, studentId)
  .query(`
    SELECT
      id,
      title,
      description,
      createdAt
    FROM Notices
    WHERE studentId = @StudentId
  `);

const announcements = await new sql.Request()
  .input("StudentId", sql.Int, studentId)
  .query(`
    SELECT
      id,
      title,
      description,
      createdAt
    FROM Announcements
    WHERE studentId = @StudentId
  `);

    const notifications = [

      ...notices.recordset.map(item => ({
        ...item,
        type: "teacher",
        isUnread: true
      })),

      ...announcements.recordset.map(item => ({
        ...item,
        type: "admin",
        isUnread: true
      }))

    ];

    notifications.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

    res.status(200).json({
      success: true,
      notifications
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  getParentDashboard,
  getChildPerformance,
  getLinkedChildren
    , getAcademicTracking,
  getFeesSummary,
  getParentProfile,
  getParentNotifications
};