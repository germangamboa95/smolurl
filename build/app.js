"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./api"));
var web_1 = __importDefault(require("./web"));
var app = express_1.default();
exports.app = app;
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use(web_1.default);
app.use(api_1.default);
// app.use(docs);
api_1.default.use(function (err, req, res, next) {
    if (err.name === "EntityNotFound") {
        return res.status(404).json({ message: "Resource missing." });
    }
    res.status(500).send("Something broke!");
});
