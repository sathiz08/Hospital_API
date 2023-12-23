const jwt = require("jsonwebtoken");
const doctors = require("../models/doctors");

//  Middleware to check user is logged in and has access
exports.checkAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("Token Error");
    return res.status(401).json({
      success: false,
      message: "Unauthroized access"
    });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    console.log(decoded);
    req.doctors = await doctors.findById(decoded.id);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Unauthroized access"
    });
  }
};