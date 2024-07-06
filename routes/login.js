const express = require("express");
const router = express.Router();
const { SALT } = require("../utils/secrets");
const sha256 = require("sha256");
const { getRandom } = require("../utils/utils");
const { asyncMySQL } = require("../mysql/driver");
router.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(password + SALT);

  const results = await asyncMySQL(`SELECT * FROM users
                                      WHERE email LIKE "${email}" 
                                        AND password LIKE "${password}";`);

  if (results.length > 0) {
    const token = getRandom();

    await asyncMySQL(`INSERT INTO sessions
                          (user_id, token)
                             VALUES
                               (${results[0].id}, "${token}");`);

    res.send({ status: 1, token });
    return;
  }

  res.send({ status: 0, reason: "Bad creds!" });
});

module.exports = router;

// SELECT * FROM users
//                                       WHERE email LIKE "Tester@a.c"
//                                         AND password LIKE "f3470650bdb787bb1ea04457bc59254f53a5ee70d760eae3e36ba270046de9af"

// f3470650bdb787bb1ea04457bc59254f53a5ee70d760eae3e36ba270046de9af
