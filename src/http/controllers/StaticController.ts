import { ClassWrapper, Controller, Get } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { Request, Response } from "express";
import { wrapAsync } from "../../utils/async-wrapper";

@Controller("")
@ClassWrapper(wrapAsync)
export class StaticController {
  protected readonly logger: Logger;

  public constructor() {
    this.logger = new Logger();
  }

  @Get()
  protected async index(req: Request, res: Response) {
    return res.render("index");
  }
}
