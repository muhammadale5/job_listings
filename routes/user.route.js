import express from "express";
import {register, deleteUser, updateUser, login, resetPassword, forgetPassword} from "../controller/user.controller.js"

const router = express.Router();
// Authentication
router.route("/sign-up").post(register);
router.route("/sign-in").post(login);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password").post(resetPassword)
// User Routes
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteUser);

export default router;