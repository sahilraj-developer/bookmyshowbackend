export interface IAuthPayload {
  userId: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface IAuthRequest {
  user?: IAuthPayload;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface IJWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
