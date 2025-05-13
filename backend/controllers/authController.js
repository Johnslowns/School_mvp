const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const {generateToken,generateRefreshToken}=require('../utils/jwt');
const jwt=require('jsonwebtoken')
const pool = require('../db');



// Register a new user
const registerUser = async (req, res) => {
  const { full_name, registration_number, password, role, ...rest } = req.body;

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Store user with roles as array
    const newUser = await authModel.createUser(full_name, registration_number, passwordHash, role); // role is an array
    if (!newUser) {
      return res.status(500).json({ message: 'Registration error' });
    }

    const user_id = newUser.id;

    // Shared field (example: gender might be needed for both teacher/admin)
    const { gender } = rest;

    // If user is a student
    if (role.includes("student")) {
      const { subjects_taken, hostel_name, classId, guardianContact } = rest;
      await authModel.createNewStudent({ subjects_taken, hostel_name, classId, guardianContact }, user_id);
    }

    // If user is a teacher
    if (role.includes("teacher")) {
      const { subjectSpeciality, department, class_assigned_id } = rest;
      await authModel.createNewTeacher({ subjectSpeciality, department, class_assigned_id, gender }, user_id);
    }

    // If user is an admin
    if (role.includes("admin")) {
      const { position } = rest;
      await authModel.createNewAdmin({ position, gender }, user_id);
    }

    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { registration_number, password } = req.body;

  try {
    // Find the user by email
    const user = await authModel.getUserByRegistration(registration_number);

    if (!user) {
      return res.status(400).json({ message: 'Invalid registration number or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }


  
    // Generate the token
    const token =generateToken({ userId: user.id, role: user.role }
    )
    const refreshToken=generateRefreshToken({ userId: user.id, role: user.role }
    )

    //we just wait for the refreshtoken to be registered to the database 
    /*Reasons:
    🔒 Security	If a user's refresh token gets stolen, you can find and invalidate it immediately (delete the session from DB).
     Without DB sessions, you cannot revoke specific tokens easily.
    🔄 Refresh Token Rotation	When the user needs a new access token,
     they send the refresh token. The server checks in the database if that refresh token is valid and not expired.
    🔥 Logout Management	When a user logs out, you can delete their session from the database 
    — this kills their refresh token immediately.
    📊 Monitoring	You can track how many sessions a user has 
    (e.g., one on their phone, another on their laptop).
    🛡️ Extra Validation	If a user refreshes their session after 7 days
     (or after being disabled by admin), you can block them easily.
     */
        

    await authModel.createSession(
      user.id,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days expiry
    );




    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // HTTPS-only
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  

    // Send a success response (you can also generate a JWT token here)
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const refreshTheToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token provided' });
  }

  try {
    // 1. Verify JWT
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // 2. Check if token exists in DB
    const session = await authModel.getSessionByToken(decoded.userId, refreshToken);
    if (!session) {
      return res.status(401).json({ error: 'Token revoked' });
    }

    // 3. Generate new access token
    const newAccessToken = generateToken(decoded.userId);

    // 4. Send new token
    res.json({ token: newAccessToken });
  } catch (err) {
    console.error('Refresh token error:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await authModel.deleteSession(refreshToken);
    res.clearCookie('refreshToken');
  }
  res.json({ message: 'Logged out successfully' });
};

// Export the functions
module.exports = {
  registerUser,
  loginUser,
  refreshTheToken,
  logoutUser

};