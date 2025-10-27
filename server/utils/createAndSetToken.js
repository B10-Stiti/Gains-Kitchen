import jwt from 'jsonwebtoken';

const createAndSetToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "dev_secret_key", {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax', // CSRF protection
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  return token;
};

export default createAndSetToken;
