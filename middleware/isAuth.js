const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization'); //* Get 'Authorization' header request

  if (!authHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  //* Get token from 'Authorization' request header value
  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
    //* verify jwt token with secret text
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_TEXT);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  //* If token not verified with secret text
  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  req.name = decodedToken.name;
  req.email = decodedToken.email;

  next();
}