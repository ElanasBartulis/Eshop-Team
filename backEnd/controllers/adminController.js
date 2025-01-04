import {
  generateSalt,
  hashPassword,
  isValidCredentials,
} from "../utils/encription.js";
import { adminRegistrationSchema } from "../utils/validations/adminSchema.js";
import adminModel from "../models/adminModel.js";

export async function register(req, res) {
  const { password, email } = req.body;

  try {
    const validationResult = adminRegistrationSchema.safeParse(req.body);
    if (!validationResult.success)
      return res.status(400).json({ error: validationResult.error.issues });

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const admin = await adminModel.create({
      email,
      hashedPassword,
      salt,
    });

    req.session.user = {
      email,
    };
    req.session.isLogged = true;

    res
      .status(201)
      .json({ message: "Registration was successful", session: req.session });
  } catch (err) {
    if (err?.original && err.original.errno === 1062) {
      return res.status(400).json({ message: "email field was not unique" });
    }
    res
      .status(500)
      .json({ message: "internal server error", err: err.message });
  }
}

export async function login(req, res) {
  if (req.session.isLogged)
    return res.status(403).json({
      message: "You are already logged in",
    });

  const { password, email } = req.body;

  try {
    const existingAdmin = await adminModel.findOne({
      where: {
        email,
      },
    });

    if (!existingAdmin)
      return res.status(404).json({ message: "Admin not found." });

    if (
      !isValidCredentials(
        password,
        existingAdmin.salt,
        existingAdmin.hashedPassword
      )
    )
      return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = {
      email: existingAdmin.email,
      isLogged: true,
    };
    req.session.isLogged = true;

    return res
      .status(200)
      .json({ message: "Logged in successfully", session: req.session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req, res) {
  if (!req.session.isLogged)
    return res.status(403).json({
      message: "You are already logged out",
    });

  req.session.destroy();
  res.status(200).json({ message: "You logged out successfully" });
}

export async function session(req, res) {
  if (!req.session.isLogged)
    return res.status(403).json({
      message: "Not logged in",
    });

  res.status(200).json({
    user: req.session.user,
    isLogged: req.session.isLogged,
  });
}
