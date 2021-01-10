import express, { Router } from "express";
import { nanoid } from "nanoid";
import { LinkRepository } from "./links/link.repository";
import { format } from "url";
import querystring from "querystring";
const web = Router();

web.use(express.urlencoded({ extended: true }));

web.get("/", (req, res) => {
  const { url, tiny_url } = req.query;

  console.log(req.query);
  return res.render("index", {
    url,
    tiny_url,
  });
});

web.post("/", async (req, res) => {
  const { url } = req.body;
  const hash = nanoid(10);

  const link = await LinkRepository().save({
    original_url: url,
    hash,
  });

  const q = querystring.encode({
    url,
    tiny_url: `http:/localhost:5555/${hash}`,
  });
  return res.redirect(`/?${q}`);
});

export default web;
