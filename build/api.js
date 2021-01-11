"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var nanoid_1 = require("nanoid");
var link_repository_1 = require("./links/link.repository");
var webhooks_1 = require("./links/webhooks");
var async_wrapper_1 = require("./utils/async-wrapper");
var api = express_1.Router();
api.post("/links", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, hash, link;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = req.body.url;
                hash = nanoid_1.nanoid(10);
                return [4 /*yield*/, link_repository_1.LinkRepository().save({
                        original_url: url,
                        hash: hash,
                    })];
            case 1:
                link = _a.sent();
                return [4 /*yield*/, link_repository_1.LinkRepository().findOneOrFail({ hash: hash })];
            case 2:
                link = _a.sent();
                res.json({ data: link });
                return [2 /*return*/];
        }
    });
}); });
api.get("/links/:hash", async_wrapper_1.asyncUtil(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hash, link;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hash = req.params.hash;
                return [4 /*yield*/, link_repository_1.LinkRepository().findOneOrFail({ hash: hash })];
            case 1:
                link = _a.sent();
                res.json({ data: link });
                return [2 /*return*/];
        }
    });
}); }));
api.get("/:hash", async_wrapper_1.asyncUtil(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hash, link, original_url, id, webhook;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hash = req.params.hash;
                return [4 /*yield*/, link_repository_1.LinkRepository().findOneOrFail({
                        hash: hash,
                    })];
            case 1:
                link = _a.sent();
                original_url = link.original_url, id = link.id, webhook = link.webhook;
                res.redirect(original_url);
                link_repository_1.HitRepository().save({
                    link_id: id,
                    meta: { ip: req.ip, headers: req.headers },
                });
                if (webhook) {
                    webhooks_1.fireWebhook(webhook, {
                        link: link,
                        current_hit: { ip: req.ip, headers: req.headers },
                        meta: link.webhook_meta,
                    });
                }
                return [2 /*return*/];
        }
    });
}); }));
exports.default = api;
