const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'HDTFJGHyt657';

//Route 1 ceate user
router.post('/createuser', [
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Enter password of atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email is already exists" })
    }

    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt)

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success = true;
    res.json({success, authToken });

  } catch (error) {
    console.error(error.message);
    req.status(500).send("Internal server error")
  }

})

//Router 2 login
router.post('/login', [
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" })
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" })

    }

    const data = {
      user: {
        id: user.id
      }
    }
    success = true;
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({ success, authToken });

  } catch (error) {
    console.error(error.message);
    req.status(500).send("Internal server error")
  }

})

// Router 3 get users
router.post('/getuser', fetchuser, async (req, res) => {
  try {

    let userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);

  } catch (error) {
    console.error(error.message);
    req.status(500).send("Internal server error")
  }
})

module.exports = router;