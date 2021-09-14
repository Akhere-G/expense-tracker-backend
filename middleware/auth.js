const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.CLIENT_SECRET);

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_SECRET,
      });

      const payload = ticket.getPayload();

      req.userId = payload.sub;
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "You need to login in or register" });
  }
};

module.exports = auth;
