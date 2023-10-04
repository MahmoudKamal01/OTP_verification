const { Vonage } = require("@vonage/server-sdk");
require("dotenv").config();

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

let otpData = {};

function generateOTP(req, res) {
  const { countryCode, phoneNumber } = req.body;
  const newOtp = Math.floor(1000 + Math.random() * 9000);

  const from = "Vonage APIs";
  const to = `${countryCode}${phoneNumber}`;
  const text = `Your OTP is: ${newOtp}`;

  otpData = {
    otp: newOtp,
    createdAt: Date.now(),
  };

  vonage.sms
    .send({ from, to, text })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false });
    });
}

function verifyOTP(req, res) {
  const { enteredOtp } = req.body;

  if (otpData && otpData.otp == enteredOtp) {
    const currentTime = Date.now();
    const timeElapsed = (currentTime - otpData.createdAt) / 1000;

    if (timeElapsed <= 300) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "OTP has expired" });
    }
  } else {
    res.json({ success: false, message: "Invalid OTP" });
  }
}

module.exports = { generateOTP, verifyOTP };
