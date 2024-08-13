function registerUser(email, password, first_name, second_name) {
  return `INSERT INTO users
                (email, password, first_name, second_name)
                    VALUES
                      ("${email}", "${password}", "${first_name}", "${second_name}");`;
}

function addToken(userId, token) {
  return `INSERT INTO sessions
              (user_id, token)
                   VALUES
                      (${userId}, "${token}");`;
}

function addContent(userId, content_id, media_type, favourite_or_towatch) {
  return `INSERT INTO movies_or_tv
              (user_id, content_id, media_type, favourite_or_towatch)
                   VALUES
                      ("${userId}", "${content_id}", "${media_type}", "${favourite_or_towatch}");`;
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

function checkContent(user_id, content_id, media_type, favourite_or_towatch) {
  return `SELECT *
          FROM movies_or_tv
          WHERE user_id = ${user_id}
          AND content_id = ${content_id}
          AND media_type = '${media_type}'
          AND favourite_or_towatch = '${favourite_or_towatch}'`;
}

function deleteContent(user_id, content_id, media_type, favourite_or_towatch) {
  return `DELETE FROM movies_or_tv
          WHERE user_id = ${user_id}
          AND content_id = ${content_id}
          AND media_type = '${media_type}'
          AND favourite_or_towatch = '${favourite_or_towatch}'`;
}

function getFavourited(user_id) {
  return `Select * 
            FROM movies_or_tv
              WHERE user_id = ${user_id}
                AND favourite_or_towatch = "favourite"`;
}

function getToWatch(user_id) {
  return `Select * 
            FROM movies_or_tv
              WHERE user_id = ${user_id}
                AND favourite_or_towatch = "towatch"`;
}

function getUser(token) {
  return `SELECT *
            FROM users
                JOIN sessions ON users.id = sessions.user_id
                    WHERE token LIKE "${token}";`;
}

function getPicturesWithSyllables(speechSound, syllables) {
  return `Select * 
            FROM images
              WHERE speech_sound = "${speechSound}"
                AND syllables = ${syllables};
               `;
}

function getPictures(speechSound) {
  return `Select * 
            FROM images
              WHERE speech_sound = "${speechSound}"
                ;
               `;
}

module.exports = {
  registerUser,
  addToken,
  addContent,
  checkContent,
  deleteContent,
  deleteToken,
  deleteUser,
  updateUser,
  checkToken,
  getUser,
  getFavourited,
  getToWatch,
  getPicturesWithSyllables,
  getPictures,
};
