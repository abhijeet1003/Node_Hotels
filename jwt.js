const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // what is no token passsed
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  // token is passed in header so extract it ...we pass bearer token
  const token = req.headers.authorization.split(" ")[1];
  if (!token) res.status(401).json({ error: "Unauthorized" });

  // very the jwt token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info with route
    req.user = decoded;
    // decoded userinfo ko bhej deta hai tali routes ko madad mile

    next();
  } 
  
  
  catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

// function to generate token

const generateToken = (userData) => {
  //generate function ko user ka data chaiye rehta hai to generate jwt token



  //    generate token JWT for new user
  // we are setting the expiry date of token that this token will expire in these min
  return jwt.sign({userData}, process.env.JWT_SECRET, { expiresIn: 300 }); //expire in 300 sec
};

module.exports = { jwtAuthMiddleware, generateToken };
