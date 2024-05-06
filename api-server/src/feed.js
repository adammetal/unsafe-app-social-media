import { Router } from "express";
import { createPost, getMyFeed } from "./db.js";

const feed = new Router();

feed.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ msg: 'Forbidden' });
  }

  const q = req.query.q;
  console.log(q);

  const { id } = req.session.user;
  const myFeed = await getMyFeed(id, q);

  return res.json(myFeed);
});

feed.post('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ msg: 'Forbidden' });
  }

  const { id } = req.session.user;

  const newPost = await createPost(id, req.body.body);
  return res.json(newPost);
});

export default feed;
