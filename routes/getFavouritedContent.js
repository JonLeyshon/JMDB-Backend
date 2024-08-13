const express = require("express");
const router = express.Router();
const { asyncMySQL } = require("../mysql/driver");
const { getUser, getFavourited } = require("../mysql/queries");
const { checkIsUser } = require("../utils/middleware");

router.get("/", checkIsUser, async (req, res) => {
  try {
    let user = await asyncMySQL(getUser(req.headers.token));
    if (user.length === 0) {
      return res.status(404).send("User not found");
    }

    const user_id = user[0].user_id;
    const results = await asyncMySQL(getFavourited(user_id));

    res.send(results);
  } catch (e) {
    console.error("Error checking content:", e);
    res.status(400).send("Error checking content");
  }
});

module.exports = router;
