const express = require("express");
const router = express.Router();
const { asyncMySQL } = require("../mysql/driver");
const {
  getUser,
  addContent,
  checkContent,
  deleteContent,
} = require("../mysql/queries");
const { checkIsUser } = require("../utils/middleware");

router.post("/", checkIsUser, async (req, res) => {
  const { content_id, media_type, favourite_or_towatch } = req.body;

  if (!content_id || !media_type || !favourite_or_towatch) {
    return res.status(400).send("Bad Request, Missing data");
  }

  try {
    let user = await asyncMySQL(getUser(req.headers.token));
    if (user.length === 0) {
      return res.status(404).send("User not found");
    }

    const user_id = user[0].user_id;
    const body = { user_id, content_id, media_type, favourite_or_towatch };

    async function checkExistingContent(req, res) {
      const results = await asyncMySQL(
        checkContent(user_id, content_id, media_type, favourite_or_towatch)
      );
      console.log(results);
      if (results.length === 0) {
        await asyncMySQL(
          addContent(user_id, content_id, media_type, favourite_or_towatch)
        );

        return;
      }
      await asyncMySQL(
        deleteContent(user_id, content_id, media_type, favourite_or_towatch)
      );
    }
    checkExistingContent(body);

    res.send("complete");
  } catch (e) {
    console.error("Error registering user:", e);
    res.status(400).send("Error registering user");
  }
});

module.exports = router;
