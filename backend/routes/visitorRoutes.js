const sendEmail = require("../utils/sendEmail");
const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");
const Otp = require("../models/Otp");

// Register visitor
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, reason, toMeet, date, passId } = req.body;

    global.tempVisitor = {
      name,
      email,
      phone,
      reason,
      toMeet,
      date,
      passId
    };

    res.status(200).json({ message: "Details received. Please verify OTP." });
  } catch (error) {
    res.status(500).json({ error: "Error saving visitor" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching visitors" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedVisitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedVisitor);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

router.get("/verify/:passId", async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ passId: req.params.passId });

    if (!visitor) {
      return res.json({ status: "invalid" });
    }

    return res.json({ status: "valid", visitor });
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // delete old OTP if exists
    await Otp.deleteMany({ email });

    // store new OTP in DB
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000)
    });

    await sendEmail(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email });

    if (!record) {
      return res.json({ status: "invalid" });
    }

    if (Date.now() > record.expiresAt) {
      await Otp.deleteMany({ email });
      return res.json({ status: "expired" });
    }

    if (record.otp === otp) {
      await Otp.deleteMany({ email });

      if (global.tempVisitor && global.tempVisitor.email === email) {
        const visitor = new Visitor(global.tempVisitor);
        await visitor.save();
        global.tempVisitor = null;
      }

      return res.json({ status: "verified" });
    } else {
      return res.json({ status: "invalid" });
    }
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});
module.exports = router;