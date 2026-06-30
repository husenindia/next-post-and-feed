import Database from "better-sqlite3";
import { Post } from "@/type/post";

const db = new Database("posts.db");

type UserCount = {
  count: number;
};

type StorePost = {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
};

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY,
      image_url TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER,
      post_id INTEGER,
      PRIMARY KEY(user_id, post_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    )
  `);

  const stmt = db.prepare<[], UserCount>(`
    SELECT COUNT(*) AS count
    FROM users
  `);

  const result = stmt.get();

  if (result?.count === 0) {
    db.exec(`
      INSERT INTO users (first_name, last_name, email)
      VALUES
      ('John', 'Doe', 'john@example.com'),
      ('Max', 'Schwarz', 'max@example.com')
    `);
  }
}

initDb();

export async function getPosts(
  maxNumber?: number
): Promise<Post[]> {
  const limitClause = maxNumber ? "LIMIT ?" : "";

  const stmt = db.prepare<
    [number?],
    Post
  >(`
    SELECT
      posts.id,
      image_url AS image,
      title,
      content,
      created_at AS createdAt,
      first_name AS userFirstName,
      last_name AS userLastName,
      COUNT(likes.post_id) AS likes,
      EXISTS(
        SELECT *
        FROM likes
        WHERE likes.post_id = posts.id
        AND likes.user_id = 2
      ) AS isLiked
    FROM posts
    INNER JOIN users
      ON posts.user_id = users.id
    LEFT JOIN likes
      ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY createdAt DESC
    ${limitClause}
  `);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return maxNumber ? stmt.all(maxNumber) as Post[]: stmt.all() as Post[];
}

export async function storePost(
  post: StorePost
): Promise<void> {
  const stmt = db.prepare(`
    INSERT INTO posts
    (image_url, title, content, user_id)
    VALUES (?, ?, ?, ?)
  `);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  stmt.run(
    post.imageUrl,
    post.title,
    post.content,
    post.userId
  );
}

export async function updatePostLikeStatus(
  postId: number,
  userId: number
) {
  const stmt = db.prepare<[number, number], UserCount>(`
    SELECT COUNT(*) AS count
    FROM likes
    WHERE user_id = ?
      AND post_id = ?
  `);

  const result = stmt.get(userId, postId);

  const isLiked = result?.count === 0;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (isLiked) {
    return db
      .prepare(`
        INSERT INTO likes (user_id, post_id)
        VALUES (?, ?)
      `)
      .run(userId, postId);
  }

  return db
    .prepare(`
      DELETE FROM likes
      WHERE user_id = ?
        AND post_id = ?
    `)
    .run(userId, postId);
}