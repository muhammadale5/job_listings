import express from "express";
import { register, login, getAllUsers, protectedRoute, roleBaseAccess } from "../controller/user.controller.js";

const router = express.Router();
// Authentication
router.route("/sign-up").post(register);
router.route("/sign-in").post(login);
router.route("/").get(protectedRoute, roleBaseAccess('admin'), getAllUsers);
// router.route("/forget-password").post(forgetPassword);
// router.route("/reset-password").post(resetPassword)
// // User Routes
// router.route("/:id").patch(updateUser);
// router.route("/:id").delete(deleteUser);

export default router;
