const { Pool } = require('pg');

const databaseUrl = 'postgres://me:1234@localhost:5432/twitter';

const database = new Pool({
  connectionString: databaseUrl
});

function getTweets() {
  return database.query(`
    SELECT
      tweets.id,
      tweets.message,
      tweets.created_at,
      users.name,
      users.handle
    FROM
      tweets
    INNER JOIN users ON
      tweets.user_id = users.id
    ORDER BY created_at DESC;
  `)
    .then((results) => results.rows);
}

function createTweet(message, user_id) {
  return database.query(`
    INSERT INTO tweets
      (message, user_id)
    VALUES
      ($1, $2)
    RETURNING
      *
  `, [
    message,
    user_id
  ])
    .then((results) => results.rows[0]);
}

function getUserByHandle(handle) {
  return database.query(`
    SELECT * FROM users WHERE handle = $1
  `, [handle])
    .then((results) => results.rows[0]);
}

module.exports = {
  getTweets,
  createTweet,
  getUserByHandle,
};