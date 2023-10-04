const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authenticationRoutes = require("./routes/authenticationRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(authenticationRoutes); // Use authentication routes
app.use(otpRoutes); // Use OTP routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
