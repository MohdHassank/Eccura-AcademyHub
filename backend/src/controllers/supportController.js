const { sql } = require("../config/db");

const createTicket = async (req, res) => {
  try {

    const {
      parentId,
      title,
      description
    } = req.body;

    await new sql.Request()
      .input("ParentId", sql.Int, parentId)
      .input("Title", sql.VarChar, title)
      .input("Description", sql.VarChar, description)
      .query(`
        INSERT INTO SupportTickets
        (
          parentId,
          title,
          description
        )
        VALUES
        (
          @ParentId,
          @Title,
          @Description
        )
      `);

    return res.status(200).json({
      success: true,
      message: "Ticket Created Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getSupportConfig = async (req, res) => {

  try {

    const result = await new sql.Request()
      .query(`
        SELECT TOP 1 *
        FROM SupportConfig
      `);

    return res.status(200).json({
      success: true,
      config: result.recordset[0]
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createTicket,
    getSupportConfig
};