const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { SALT } = require("../utils/secrets");
const { getRandom } = require("../utils/utils");
const { asyncMySQL } = require("../mysql/driver");
const { registerUser, addToken } = require("../mysql/queries");

router.post("/", async (req, res) => {
  //   console.log("Winner: ", req.body);
  let { email, password, first_name, second_name } = req.body;
  console.log(req.body);

  if (!email || !password) {
    res.status(400).send("Bad Request, Missing data ");
  }

  password = sha256(password + SALT);
  const token = getRandom();
  //   //why not login at the same time

  try {
    const result = await asyncMySQL(
      registerUser(email, password, first_name, second_name)
    );
    console.log("token:" + token);
    console.log(result.insertId);
    await asyncMySQL(addToken(result.insertId, token));

    res.send({ status: 200, token });
  } catch (e) {
    console.error("Error registering user:", e);
    res.status(400).send("Error registering user");
  }
});

module.exports = router;
