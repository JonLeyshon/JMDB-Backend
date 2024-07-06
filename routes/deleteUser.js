const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../utils/middleware");
const { asyncMySQL } = require("../mysql/driver");
const { deleteUser } = require("../mysql/queries");

router.delete("/:id", checkIsUser, async (req, res) => {
  await asyncMySQL(deleteUser(req.headers.token));
  //Need to delete all tokens associated.

  res.send({ status: 1 });
});

module.exports = router;
