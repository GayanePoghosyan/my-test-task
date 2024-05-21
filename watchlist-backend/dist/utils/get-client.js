"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
var getClient = function (ctx) {
    switch (ctx.getType()) {
        case 'ws':
            return ctx.switchToWs().getClient().handshake;
        case 'http':
            return ctx.switchToHttp().getRequest();
        default:
            return;
    }
};
exports.getClient = getClient;
