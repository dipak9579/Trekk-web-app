const jwt = require('jsonwebtoken');
const SignUp = require('../src/models/signUp');

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await SignUp.findById(decoded.id);
    next();
  } catch (error) {
    res.clearCookie('token');
    res.redirect('/login');
  }
};

module.exports = { authenticate };
