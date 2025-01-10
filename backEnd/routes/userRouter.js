import express from "express";
import * as userController from "../controllers/userController.js";
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/log-out", userController.logout);
router.put("/update", userController.updateUser);
router.post("/adminRegister", userController.registerAdmin);
router.get("/session", userController.getSessionData);
router.get("/users", userController.getAllUsers);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id", userController.updateUserById);

export default router;
