import express, { Router } from "express";
import { nanoid } from "nanoid";
import { LinkRepository } from "./links/link.repository";
import { format } from "url";
import querystring from "querystring";
const web = Router();

web.use(express.static("public"));

web.use(express.urlencoded({ extended: true }));

web.get("/", (req, res) => {
  const { url, tiny_url } = req.query;

  console.log(req.query);
  return res.render("index", {
    url,
    tiny_url,
  });
});

export default web;
