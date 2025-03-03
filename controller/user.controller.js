import User from "../model/user.model.js";

export const register = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const forgetPassword = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const resetPassword = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const updateUser = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const deleteUser = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const login = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const getAllUsers = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
