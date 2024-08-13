const { asyncMySQL } = require("../mysql/driver");
const { checkToken, deleteContent, checkContent } = require("../mysql/queries");

async function checkIsUser(req, res, next) {
  const results = await asyncMySQL(checkToken(req.headers.token));
  if (results.length) {
    next();
    return results;
    // check this return change doesn't afffect other routes
  }

  res.send({ status: 400, reason: "Bad token" });
}

module.exports = { checkIsUser };
