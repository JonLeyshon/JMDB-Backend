const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { SALT } = require("../utils/secrets");
const { checkIsUser } = require("../utils/middleware");
const { asyncMySQL } = require("../mysql/driver");
const { updateUser } = require("../mysql/queries");

router.patch("/:id", checkIsUser, async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    return res.status(400).send({ status: 400, reason: "Missing any data" });
  }

  try {
    if (email) {
      console.log("Updating email...");
      await asyncMySQL(updateUser("email", email, req.headers.token));
    }
    if (password) {
      console.log("Updating password...");
      await asyncMySQL(
        updateUser("password", sha256(password + SALT), req.headers.token)
      );
    }

    return res
      .status(200)
      .send({ status: 200, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .send({ status: 500, reason: "Internal Server Error" });
  }
});

module.exports = router;
