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
    const validationResult = registrationSchema.safeParse(req.body);
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
      id: user.id,
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

    // Set all user data
    req.session.user = {
      id: existingUser.id,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      phoneNumber: existingUser.phoneNumber,
      address: existingUser.address,
      postCode: existingUser.postCode,
      id: existingUser.id,
      admin: existingUser.admin,
    };
    req.session.admin = existingUser.admin;
    req.session.isLogged = true;

    return res
      .status(200)
      .json({ message: 'Logged in successfully', session: req.session });
  } catch (err) {
    console.error('Login error:', err);
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
// http://localhost/server/api/users/update
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

// http://localhost/server/api/users/users/4
export async function updateUserById(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  if (!req.session.isLogged)
    return res.status(400).json({ message: 'Nothing to see here.' });
  try {
    const [updated] = await UserModel.update(updateData, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}
//SESSION CONTROLLER
export async function getSessionData(req, res) {
  if (!req.session.isLogged) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  try {
    // Check if user id is in session
    if (!req.session.user?.id) {
      res.status(404).json({ message: 'User is not defined' });
    }

    // If we have a valid userId, try to get fresh data
    const freshUserData = await UserModel.findOne({
      where: { id: req.session.user.id },
    });
    //with plain : true; We getting plain data object without unesesary wraps
    const userData = freshUserData
      ? freshUserData.get({ plain: true })
      : req.session.user;

    res.status(200).json({
      message: 'User session data retrieved',
      user: userData,
      isLogged: true,
    });
  } catch (error) {
    console.log('Error in getSessionData:', error);
    res.status(500).json({ message: 'Enternal server error' });
  }
}

export async function registerAdmin(req, res) {
  const { password, email } = req.body;

  // While this line is active , create Admin is not accessable
  if (!req.session.admin)
    return res.status(400).json({ message: 'Request Denied' });

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

export async function getAllUsers(req, res) {
  if (!req.session.admin)
    return res.status(400).json({ message: 'Nothing to see here.' });
  try {
    // Total user count
    const count = await UserModel.count();

    // Get page limits
    const pageNumber = +req.query?.page || 0;
    const rowsPerPage = +req.query?.rowsPerPage || count;

    const users = await UserModel.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'address',
        'postCode',
        'admin',
      ],
      offset: pageNumber * rowsPerPage,
      limit: rowsPerPage,
    });

    res.status(200).json({ users, count });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    if (!req.session.admin)
      return res.status(400).json({ message: 'Permission denied' });

    const deleted = await UserModel.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
}
