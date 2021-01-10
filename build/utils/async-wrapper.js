"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncUtil = void 0;
var asyncUtil = function (fn) {
    return function asyncUtilWrap() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var fnReturn = fn.apply(void 0, args);
        var next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
    };
};
exports.asyncUtil = asyncUtil;
