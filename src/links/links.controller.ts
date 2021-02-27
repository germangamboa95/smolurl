import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { HitRepository, LinkRepository } from "./link.repository";
import { fireWebhook } from "./webhooks";



@Controller('links')
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

@Controller('')
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

