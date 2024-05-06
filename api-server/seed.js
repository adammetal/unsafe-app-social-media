import client from "./src/db.js";

const userTbl = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );

  CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);
`;

const postsTable = `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    body TEXT,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`;

const friendsTable = `
  CREATE TABLE IF NOT EXISTS friends (
      user_id INTEGER,
      friend_id INTEGER,
      PRIMARY KEY (user_id, friend_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (friend_id) REFERENCES users(id)
  );
`;

(async () => {
  await client.execute(userTbl);
  await client.execute(postsTable);
  await client.execute(friendsTable);
})();
