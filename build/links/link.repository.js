"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitRepository = exports.LinkRepository = void 0;
var link_model_1 = require("./link.model");
var typeorm_1 = require("typeorm");
var hit_model_1 = require("./hit.model");
var LinkRepository = function () { return typeorm_1.getRepository(link_model_1.Link); };
exports.LinkRepository = LinkRepository;
var HitRepository = function () { return typeorm_1.getRepository(hit_model_1.Hit); };
exports.HitRepository = HitRepository;