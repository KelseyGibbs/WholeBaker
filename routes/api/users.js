const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);


// Load User model/schema
const User = require("../../models/Users");

// Define API register route
router.post("/register", (req, res) => {

  // Validate the user input
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check if valid, return error if invalid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Create a new user, if a user with that email address doesn't allready exist 
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      });

      // Hash password using bcrypt then save the hashed password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});


  
// Define API login route
router.post("/login", (req, res) => {
  
// Validate the user input
  const { errors, isValid } = validateLoginInput(req.body);

  // Check if the user input is a valid format, if it isn't throw errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Assign the user input to local variables
  const email = req.body.email;
  const password = req.body.password;
  const isAdminn = req.body.isAdmin;


  // Find the user that matches the user input
  User.findOne({ email }).then(user => {
    // Check if user exists, if it doens't throw an error
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          isAdmin: user.isAdmin
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
