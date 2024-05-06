import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

const client = createClient({
  url: "file:./database.db",
});

export const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = '${email}'`;
  console.log(sql);
  const result = await client.execute(sql);
  console.log(result);
  return result?.rows?.[0]; //optional chainging
};

export const createUser = async (email, password) => {
  const hash = await bcrypt.hash(password, 8);

  const sql = `
    INSERT INTO users (email, password) VALUES ('${email}', '${hash}') RETURNING *;
  `;

  const result = await client.execute(sql);
  return result.rows[0];
};

export const getMyFeed = async (userId, q = '') => {
  const sql = 'SELECT * FROM friends WHERE user_id = ?';
  const result = await client.execute({
    sql: sql,
    args: [userId]
  });

  const posts = await Promise.all(
    result.rows.map((row) => {
      const sql = `
        SELECT * FROM posts WHERE userId = ? AND body LIKE ?
      `;

      return client.execute({
        sql: sql,
        args: [row.friend_id, '%' + q]
      });
    })
  );

  const myPosts = await client.execute({
    sql: 'SELECT * FROM posts WHERE userId = ? AND body LIKE ?',
    args: [userId, '%' + q]
  });

  return [...posts, myPosts].map((post) => post.rows).flat();
};

export const createPost = async (userId, body) => {
  const sql = `
    INSERT INTO posts
      (userId, body)
    VALUES
      (?, ?)
    RETURNING *
  `;

  const result = await client.execute({
    sql,
    args: [userId, body]
  });
  return result?.rows?.[0];
}

export default client;
