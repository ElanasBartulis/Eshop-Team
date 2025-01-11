import {
  generateSalt,
  hashPassword,
  isValidCredentials,
} from '../utils/encription.js';

import UserModel from '../models/userModel.js';
import { adminRegistrationSchema } from '../utils/validations/adminSchema.js';

import {
  registrationSchema,
  updateSchema,
} from '../utils/validations/UserSchema.js';

//REGISTRATION CONTROLLER (user registration)
export async function register(req, res) {
  if (req.session.isLogged)
    return res.status(403).json({
      message: 'You are already logged in. Log out to create new User',
    });

  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    postCode,
    address,
  } = req.body;

  try {
    const validationResult = updateSchema.safeParse(req.body);
    if (!validationResult.success)
      return res.status(400).json({ error: validationResult.error.issues });

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const user = await UserModel.create({
      email,
      hashedPassword,
      salt,
      firstName,
      lastName,
      phoneNumber,
      address,
      postCode,
    });

    req.session.user = {
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      postCode,
      id,
    };
    req.session.userId = user.id;
    req.session.isLogged = true;

    res
      .status(201)
      .json({ message: 'Registration was successful', session: req.session });
  } catch (err) {
    if (err?.original && err.original.errno === 1062) {
      return res
        .status(400)
        .json({ message: 'username or email field was not unique' });
    }
    res
      .status(500)
      .json({ message: 'internal server error', err: err.message });
  }
}
// LOGIN CONTROLLER (user Log in)
export async function login(req, res) {
  if (req.session.isLogged)
    return res.status(403).json({ message: 'You already logged in' });

  const { password, email } = req.body;
  try {
    const existingUser = await UserModel.findOne({ where: { email } });

    if (!existingUser)
      return res.status(404).json({ message: 'User not found' });

    if (
      !isValidCredentials(
        password,
        existingUser.salt,
        existingUser.hashedPassword
      )
    )
      return res.status(400).json({ message: 'Invalid credentials' });

    req.session.user = {
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      phoneNumber: existingUser.phoneNumber,
      address: existingUser.address,
      postCode: existingUser.postCode,
      id: existingUser.id,
    };
    req.session.isLogged = true;
    req.session.admin = existingUser.admin;

    return res
      .status(200)
      .json({ message: 'Logged in successfully', session: req.session });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

//USER LOGOUT CONTROLLER

export async function logout(req, res) {
  if (!req.session.isLogged)
    return res.status(403).json({ message: 'You are already logged out' });
  req.session.destroy(() => {
    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'You logged out successfully' });
  });
}

// USER LOGOUT CONTROLLER
export async function updateUser(req, res) {
  if (!req.session.isLogged)
    return res
      .status(403)
      .json({ message: 'You must be logged in to update your profile' });
  const userEmail = req.session.user.email;
  const updateData = req.body;
  try {
    const validationResult = updateSchema.safeParse(updateData);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.issues });
    }

    const validUpdateData = validationResult.data;

    if (validUpdateData.password) {
      const salt = generateSalt();
      const hashedPassword = hashPassword(validUpdateData.password, salt);
      validUpdateData.hashedPassword = hashedPassword;
      validUpdateData.salt = salt;
      delete validUpdateData.password;
    }

    await UserModel.update(validUpdateData, { where: { email: userEmail } });

    if (
      validUpdateData.email ||
      validUpdateData.phoneNumber ||
      validUpdateData.address ||
      validUpdateData.postCode
    ) {
      req.session.user = {
        ...req.session.user,
        ...validUpdateData,
      };
    }
    return res
      .status(200)
      .json({ message: 'User updated', updatedFields: validUpdateData });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getSessionData(req, res) {
  if (!req.session.isLogged) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  const { user, userId, admin } = req.session;
  res.status(200).json({
    message: 'User session data retrieved',
    user: { id: userId, ...user, admin },
    isLogged: true,
  });
}

export async function registerAdmin(req, res) {
  const { password, email } = req.body;

  try {
    const validationResult = adminRegistrationSchema.safeParse(req.body);
    if (!validationResult.success)
      return res.status(400).json({ error: validationResult.error.issues });

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const admin = await UserModel.create({
      email,
      hashedPassword,
      salt,
      admin: true,
    });

    req.session.user = {
      email,
      admin,
    };
    req.session.isLogged = true;

    res
      .status(201)
      .json({ message: 'Registration was successful', session: req.session });
  } catch (err) {
    if (err?.original && err.original.errno === 1062) {
      return res.status(400).json({ message: 'email field was not unique' });
    }
    res
      .status(500)
      .json({ message: 'internal server error', err: err.message });
  }
}
