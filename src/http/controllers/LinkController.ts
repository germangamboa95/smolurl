import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { LinkRepository } from "../../links/link.repository";

@Controller("links")
export class LinkController {
  @Get(":hash")
  protected async list(req: Request, res: Response) {
    const hash = req.params.hash;
    const link = await LinkRepository().findOneOrFail({ hash });
    res.json({ data: link });
  }

  @Post()
  protected async store(req: Request, res: Response) {
    const { url } = req.body;

    const hash = nanoid(10);

    let link = await LinkRepository().save({
      original_url: url,
      hash,
    });

    link = await LinkRepository().findOneOrFail({ hash });

    return res.json({ data: link });
  }
}
