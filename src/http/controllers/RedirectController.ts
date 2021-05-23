import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import {
  HitRepository,
  LinkRepository,
} from "../../modules/links/link.repository";
import { fireWebhook } from "../../modules/links/webhooks";

@Controller("")
export class RedirectController {
  @Get(":hash")
  protected async redirect(req: Request, res: Response) {
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
  }
}
