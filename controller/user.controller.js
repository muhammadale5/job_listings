import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protectedRoute = async (req, res, next) => {
  try {
    // get the token from the request header
    if (
      !req.headers.authorization &&
      !req.headers.authorization.startsWith("Bearer")
    )
      return res.status(401).json({
        status: "fail",
        message: "Unauthorize, Invalid Token",
      });

    const token = req.headers.authorization.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decode);
    const user = await User.findById({ _id: decode.id }).select("-password");
    if (!user)
      return res.status(401).json({
        status: "fail",
        message: "Unauthorize, User Not Found",
      });

    req.user = user;
    // verify if user exist
    // verify token
    // get to the next middleware
    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};

export const roleBaseAccess = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(401).json({
        status: "fail",
        message: "Unauthorize, You are not permitted to perform this action",
      });

    next();
  };
};

export const register = async (req, res) => {
  try {
    const data = req.body;

    // Normalize email to lowercase
    // Faiza@gmail -> faizan@gmail.com
    const email = data.email.toLowerCase();

    // Check if user already exists with lowercase email
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(400).json({
        status: "fail",
        message: "User Already Exist",
      });

    if (data.password !== data.passwordConfirm)
      return res.status(400).json({
        status: "fail",
        message: "Password and password Confirm must be same",
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Create user with lowercase email
    const newUser = await User.create({
      fullName: data.fullName,
      email: email, // Use normalized email
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    
    const user = await User.findOne({ email: data.email });
    if (!user)
      return res.status(400).json({
        status: "fail",
        message: "Invalid Credentials",
      });
    if (!(await bcrypt.compare(data.password, user.password)))
      return res.status(400).json({
        status: "fail",
        message: "Invalid Credentials",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3m",
    });

    res.status(201).json({
      status: "success",
      data: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};

// export const forgetPassword = (req, res) => {
//   try {
//     res.status(201).json({
//       status: "success",
//       data: {},
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };
// export const resetPassword = (req, res) => {
//   try {
//     res.status(201).json({
//       status: "success",
//       data: {},
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };
// export const updateUser = (req, res) => {
//   try {
//     res.status(201).json({
//       status: "success",
//       data: {},
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };
// export const deleteUser = (req, res) => {
//   try {
//     res.status(201).json({
//       status: "success",
//       data: {},
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(201).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
