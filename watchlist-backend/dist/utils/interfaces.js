"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IResponseMessage = void 0;
var IResponseMessage = function (success, message, statusCode) { return ({
    success: success,
    statusCode: statusCode,
    message: message
}); };
exports.IResponseMessage = IResponseMessage;
