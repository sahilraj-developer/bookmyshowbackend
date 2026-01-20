import { Response, NextFunction } from 'express';
import { IAuthRequest } from './authMiddleware';

export const authorize = (roles: string[]) => {
  return (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        statusCode: 401
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        statusCode: 403
      });
    }

    next();
  };
};

export const adminOnly = (req: IAuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
      statusCode: 401
    });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
      statusCode: 403
    });
  }

  next();
};

export const userOnly = (req: IAuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
      statusCode: 401
    });
  }

  next();
};

export const ownerOrAdmin = (req: IAuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
      statusCode: 401
    });
  }

  const userId = req.params.id;
  if (req.user.userId !== userId && req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to perform this action',
      statusCode: 403
    });
  }

  next();
};
