import express from "express";
import { nanoid } from "nanoid";
import { LinkRepository } from "./links/link.repository";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const x = await LinkRepository().find();
  res.json({ x });
});

app.post("/links", async (req, res) => {
  const { url } = req.body;
  const hash = nanoid(10);

  const x = await LinkRepository().save({
    original_url: url,
    hash,
  });
  res.json({ x });
});

app.get("/:hash", async (req, res) => {
  const hash = req.params.hash;
  const { original_url } = await LinkRepository().findOneOrFail({ hash });
  res.redirect(original_url);
});

export default async () => {
  return app;
};
