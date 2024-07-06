function registerUser(email, password) {
  return `INSERT INTO users
                (email, password)
                    VALUES
                      ("${email}", "${password}");`;
}

function addToken(userId, token) {
  return `INSERT INTO sessions
              (user_id, token)
                   VALUES
                      (${userId}, "${token}");`;
}

function deleteToken(token) {
  return `DELETE FROM sessions
                      WHERE token LIKE "${token}";`;
}

function deleteUser(token) {
  return `DELETE users, sessions FROM users
                  JOIN sessions ON users.id = sessions.user_id
                      WHERE token LIKE "${token}"`;
}

function updateUser(key, value, token) {
  return `UPDATE users
                  JOIN sessions ON users.id = sessions.user_id
                      SET ${key} = "${value}"
                          WHERE sessions.token LIKE "${token}";`;
}

function checkToken(token) {
  return `SELECT users.id
                  FROM users
                      JOIN sessions ON users.id = sessions.user_id
                          WHERE token LIKE "${token}";`;
}

module.exports = {
  registerUser,
  addToken,
  deleteToken,
  deleteUser,
  updateUser,
  checkToken,
};
