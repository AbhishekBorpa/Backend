import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    console.log("📥 Request body:", req.body); // Add this
    
    const { name, email, password } = req.body;

    /* Validation */
    if (!name || !email || !password) {
      console.log("❌ Validation failed"); // Add this
      return res.status(400).json({
        success: false,
        message: "Provide all details"
      });
    }

    /* Check existing user */
    const existingUser = await userModel.findOne({ email });
    console.log("🔍 Existing user check:", existingUser); // Add this
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Account already exists"
      });
    }

    /* Hash password */
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("🔐 Password hashed"); // Add this

    /* Create user */
    const users = await userModel.create({
      name,
      email,
      password: hashedPassword
    });
    
    console.log("✅ User created:", users); // Add this

    /* Generate token */
    const token = generateToken(users._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: users._id,
        name: users.name,
        email: users.email
      }
    });

  } catch (error) {
    console.error("❌ Error:", error); // Add this
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* Validation */
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    /* Check user */
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    /* Compare password */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    /* Generate token */
    const token1 = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token1,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
