import "reflect-metadata";
require("dotenv").config();
import { Server } from "@overnightjs/core";
import express from "express"
import { LinkController, RedirectController } from "./links/links.controller";
import { StaticController } from "./StaticController";


export class ApplicationServer extends Server {

  constructor() {
    super(process.env.NODE_ENV === 'development'); // setting showLogs to true
    this.setup()
    this.setupControllers();
  }

  private setupControllers(): void {


    super.addControllers(
      [new StaticController(), new LinkController(), new RedirectController()],

    );
  }

  private setup() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set("view engine", "ejs");
    this.app.use(express.json());
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp('Server listening on port: ' + port);
    })
  }
}