"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
var common_1 = require("@nestjs/common");
var get_client_1 = require("../utils/get-client");
exports.CurrentUser = (0, common_1.createParamDecorator)(function (data, ctx) { var _a; return ((_a = (0, get_client_1.getClient)(ctx)) === null || _a === void 0 ? void 0 : _a.user) || ''; });
