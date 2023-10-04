const jwt = require("jsonwebtoken");

const users = {
  admin: "123456",
};

function login(req, res) {
  const { username, password } = req.body;

  if (users[username] === password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, { httpOnly: true });
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
}

function logout(req, res) {
  res.clearCookie("jwt");
  res.sendStatus(200);
}

module.exports = { login, logout };
