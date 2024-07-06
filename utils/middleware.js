const { asyncMySQL } = require("../mysql/driver");
const { checkToken } = require("../mysql/queries");

async function checkIsUser(req, res, next) {
  console.log(req.headers.token);
  const results = await asyncMySQL(checkToken(req.headers.token));
  if (results.length) {
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsUser };
