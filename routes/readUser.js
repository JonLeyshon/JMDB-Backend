const express = require("express");
const { getUser } = require("../mysql/queries");
const { asyncMySQL } = require("../mysql/driver");
const { checkIsUser } = require("../utils/middleware");
const router = express.Router();

router.get("/", checkIsUser, async (req, res) => {
  console.log("Here");
  const results = await asyncMySQL(getUser(req.headers.token));

  //the magic
  res.send({ status: 200, user: results[0] });
});

module.exports = router;
