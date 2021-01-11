import express, { Router } from "express";
import { nanoid } from "nanoid";
import { HitRepository, LinkRepository } from "./links/link.repository";
import { fireWebhook } from "./links/webhooks";
import { asyncUtil } from "./utils/async-wrapper";

const api = Router();

api.post("/links", async (req, res) => {
  const { url } = req.body;

  const hash = nanoid(10);

  let link = await LinkRepository().save({
    original_url: url,
    hash,
  });

  link = await LinkRepository().findOneOrFail({ hash });

  res.json({ data: link });
});

api.get(
  "/links/:hash",
  asyncUtil(async (req: express.Request, res: express.Response) => {
    const hash = req.params.hash;
    const link = await LinkRepository().findOneOrFail({ hash });
    res.json({ data: link });
  })
);

api.get(
  "/:hash",
  asyncUtil(async (req: express.Request, res: express.Response) => {
    const hash = req.params.hash;
    const link = await LinkRepository().findOneOrFail({
      hash,
    });

    const { original_url, id, webhook } = link;

    res.redirect(original_url);

    HitRepository().save({
      link_id: id,
      meta: { ip: req.ip, headers: req.headers },
    });

    if (webhook) {
      fireWebhook(webhook, {
        link,
        current_hit: { ip: req.ip, headers: req.headers },
        meta: link.webhook_meta,
      });
    }
  })
);

export default api;
