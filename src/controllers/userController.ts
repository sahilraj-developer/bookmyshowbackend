import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { generateTokens, verifyRefreshToken, generateAccessToken } from '../utils/jwt';
import { IAuthRequest } from '../middleware/authMiddleware';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required',
        statusCode: 400
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
        statusCode: 400
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role: 'USER'
    });

    await user.save();

    const tokens = generateTokens(user._id.toString(), user.email, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      ...tokens
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      statusCode: 500,
      error: error.message
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        statusCode: 400
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        statusCode: 401
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        statusCode: 401
      });
    }

    const tokens = generateTokens(user._id.toString(), user.email, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      ...tokens
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      statusCode: 500,
      error: error.message
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
        statusCode: 400
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        statusCode: 401
      });
    }

    const newAccessToken = generateAccessToken(user._id.toString(), user.email, user.role);

    res.status(200).json({
      success: true,
      message: 'Token refreshed',
      accessToken: newAccessToken,
      expiresIn: '24h'
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
      statusCode: 401,
      error: error.message
    });
  }
};

export const getProfile = async (req: IAuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    res.status(200).json({
      success: true,
      user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      statusCode: 500,
      error: error.message
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        statusCode: 404
      });
    }
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      statusCode: 500,
      error: error.message
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'User updated',
      user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      statusCode: 500,
      error: error.message
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
        statusCode: 400
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        statusCode: 404
      });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
        statusCode: 401
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      statusCode: 500,
      error: error.message
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      statusCode: 500,
      error: error.message
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      statusCode: 500,
      error: error.message
    });
  }
};
