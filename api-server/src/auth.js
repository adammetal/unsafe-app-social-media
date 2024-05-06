import { Router } from "express";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "./db.js";

const auth = new Router();

auth.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const userInDb = await getUserByEmail(email);

  // email already in use
  if (userInDb) {
    return res.status(400).json({ msg: "Email already in use" });
  }

  const newUser = await createUser(email, password);

  return res.json({
    email: req.email,
    id: newUser.id,
  });
});

auth.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userInDb = await getUserByEmail(email);

  if (!userInDb) {
    return res.status(400).json({ msg: "Wrong Credentials" });
  }

  const result = await bcrypt.compare(password, userInDb.password);

  if (result === true) {
    req.session.user = userInDb;
    return res.json({ msg: "OK" });
  }

  return res.status(400).json({ msg: "Wrong Credentials" });
});

auth.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ msg: 'Forbidden' });
  }

  return res.json(req.session.user);
});

export default auth;
