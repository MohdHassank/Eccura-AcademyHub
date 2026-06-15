const bcrypt = require("bcryptjs");
const { sql } = require("../config/db"); // Aapke db.js se global sql instance liya

const signup = async (req, res) => {
  try {
    // 1. Frontend se bheja gaya data Destructure (nikalna) karna
    const { fullName, email, phone, password, role } = req.body;

    // 2. Validation: Check karo koi field khali toh nahi hai
    if (!fullName || !email || !phone || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: All fields (fullName, email, phone, password, role) are required.",
      });
    }

    // 3. SQL Server Request Object banana (Aapke existing global connection ke liye)
    const request = new sql.Request();

    // 4. Check Duplicate Email or Phone
    // SQL Injection se bachne ke liye inputs ko bind (.input) karna best practice hai
    const checkUserQuery = `
      SELECT email, phone FROM Students 
      WHERE email = @Email OR phone = @Phone
    `;

    const checkResult = await request
      .input("Email", sql.NVarChar(100), email)
      .input("Phone", sql.NVarChar(15), phone)
      .query(checkUserQuery);

    // Agar koi record milta hai, iska matlab duplicate data hai
    if (checkResult.recordset.length > 0) {
      const existingUser = checkResult.recordset[0];
      
      // Strict lower case comparison checks for duplicate email
      if (existingUser.email.toLowerCase() === email.toLowerCase()) {
        return res.status(400).json({
          success: false,
          message: "Conflict: This email is already registered.",
        });
      }
      
      if (existingUser.phone === phone) {
        return res.status(400).json({
          success: false,
          message: "Conflict: This phone number is already registered.",
        });
      }
    }

    // 5. Password Hashing using bcryptjs
    // Salt rounds = 10 (Yeh normal aur secure standard hai)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Database mein Naya Student Insert karna
    // Naya request object banaya taaki inputs purane wale se takrayen nahi
    const insertRequest = new sql.Request();

    const insertQuery = `
      INSERT INTO Students (fullName, email, phone, password, role)
      VALUES (@FullName, @Email, @Phone, @Password, @Role)
    `;

    await insertRequest
      .input("FullName", sql.NVarChar(100), fullName)
      .input("Email", sql.NVarChar(100), email)
      .input("Phone", sql.NVarChar(15), phone)
      .input("Password", sql.NVarChar(255), hashedPassword) // Hashed password database mein jayega
      .input("Role", sql.NVarChar(20), role)
      .query(insertQuery);

    // 7. Final Success Response return karna
    return res.status(201).json({
      success: true,
      message: "🎉 User registered successfully inside Students table!",
    });

  } catch (error) {
    console.error("❌ Error inside signup controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error occurred.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 1. Mandatory Field Check
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: Identifier and password are required.",
      });
    }

    // 2. Query Object Setup
    const request = new sql.Request();

    // 3. Search user by Email OR Phone number dynamically
    // SQL Server parameter security bind setup
    const findUserQuery = `
      SELECT id, fullName, email, phone, password, role 
      FROM Students 
      WHERE email = @Identifier OR phone = @Identifier
    `;

    const result = await request
      .input("Identifier", sql.NVarChar(100), identifier.trim())
      .query(findUserQuery);

    // 4. Case: User Not Found
    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found: The provided email or phone number is not registered.",
      });
    }

    // Agar user mil jata hai toh database ka raw record nikalte hain
    const user = result.recordset[0];

    // 5. Compare Hashed Password using bcryptjs
    // user.password plain text nahi hai, wo hash string hai
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // 6. Case: Invalid Password Mismatch
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Authentication Failed: Invalid password structure.",
      });
    }

    // 7. Success Authentication! Send required payload parameters
    return res.status(200).json({
      success: true,
      message: "Authentication successful! Welcome back 🎉",
      user: {
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  role: user.role
}
    });

  } catch (error) {
    console.error("❌ Error inside login controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error occurred during login phase.",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone } = req.body;

    const request = new sql.Request();

    await request
      .input("Id", sql.Int, id)
      .input("FullName", sql.NVarChar(100), fullName)
      .input("Email", sql.NVarChar(100), email)
      .input("Phone", sql.NVarChar(15), phone)
      .query(`
        UPDATE Students
        SET fullName = @FullName,
            email = @Email,
            phone = @Phone
        WHERE id = @Id
      `);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully"
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
  signup,
  login,
  updateProfile
};