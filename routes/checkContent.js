const express = require("express");
const router = express.Router();
const { asyncMySQL } = require("../mysql/driver");
const { getUser, checkContent } = require("../mysql/queries");
const { checkIsUser } = require("../utils/middleware");

router.get("/", checkIsUser, async (req, res) => {
  const { content_id, media_type, favourite_or_towatch } = req.query; // Use req.query instead of req.body
  if (!content_id || !media_type || !favourite_or_towatch) {
    return res.status(400).send("Bad Request, Missing data");
  }

  try {
    let user = await asyncMySQL(getUser(req.headers.token));
    if (user.length === 0) {
      return res.status(404).send("User not found");
    }

    const user_id = user[0].user_id;
    const results = await asyncMySQL(
      checkContent(user_id, content_id, media_type, favourite_or_towatch)
    );

    res.send(results);
  } catch (e) {
    console.error("Error checking content:", e);
    res.status(400).send("Error checking content");
  }
});

module.exports = router;
