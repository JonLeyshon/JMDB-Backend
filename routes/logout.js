const express = require("express");
const { checkIsUser } = require("../utils/middleware");
const { asyncMySQL } = require("../mysql/driver");
const { deleteToken } = require("../mysql/queries");
const router = express.Router();

router.delete("/", checkIsUser, async (req, res) => {
  await asyncMySQL(deleteToken(req.headers.token));

  res.send({ status: 400 });
});

module.exports = router;
