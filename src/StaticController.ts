import { ClassWrapper, Controller, Get, } from "@overnightjs/core";
import { Request, Response } from "express";
import { wrapAsync } from "./utils/async-wrapper";



@Controller('')
@ClassWrapper(wrapAsync)
export class StaticController {

    @Get()

    protected async index(req: Request, res: Response) {
        return res.render("index");
    }

}
