const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1];

    req.jwtToken = jwt.verify(token, process.env.TOKEN);
    next();

  } catch {
    res.status(401).json({
      error:" Vous n'avez pas les autorisation: token invalide, expiré ou vous n'êtes pas connecter."
    });
  }
};