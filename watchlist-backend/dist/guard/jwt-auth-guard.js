"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.JwtAuthGuard = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var jwt_1 = require("@nestjs/jwt");
var user_service_1 = require("../user/user.service");
var auth_service_1 = require("../auth/auth.service");
var get_client_1 = require("../utils/get-client");
var JwtAuthGuard = /** @class */ (function () {
    function JwtAuthGuard(authService, jwtService, userService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.reflector = new core_1.Reflector();
    }
    JwtAuthGuard.prototype.canActivate = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var client, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        client = this.getRequest(ctx);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = client;
                        return [4 /*yield*/, this.handleRequest(ctx, client)];
                    case 2:
                        _a.user = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        throw e_1;
                    case 4: return [2 /*return*/, client.user != null];
                }
            });
        });
    };
    JwtAuthGuard.prototype.handleRequest = function (ctx, client) {
        return __awaiter(this, void 0, void 0, function () {
            var token, decoded, user, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = this.getToken(ctx, client);
                        decoded = this.jwtService.decode(token);
                        if (!decoded) {
                            this.throwException(ctx, 'Unable to decode token');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.validate(decoded)];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.jwtService.verifyAsync(token, this.authService.getAccessTokenOptions(user))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 4:
                        e_2 = _a.sent();
                        this.throwException(ctx, 'Invalid token');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    JwtAuthGuard.prototype.validate = function (_a) {
        var sub = _a.sub;
        return this.userService.validateUserById(sub);
    };
    JwtAuthGuard.prototype.getToken = function (ctx, client) {
        var _a;
        var authorization = (_a = client.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ');
        if (!authorization) {
            this.throwException(ctx, 'Token not found');
        }
        if (authorization[0].toLowerCase() !== 'bearer') {
            this.throwException(ctx, 'Authorization type not valid');
        }
        if (!authorization[1]) {
            this.throwException(ctx, 'Token not provided');
        }
        return authorization[1];
    };
    JwtAuthGuard.prototype.throwException = function (ctx, message) {
        throw new common_1.UnauthorizedException(message);
    };
    JwtAuthGuard.prototype.getRequest = function (ctx) {
        return (0, get_client_1.getClient)(ctx);
    };
    JwtAuthGuard = __decorate([
        (0, common_1.Injectable)(),
        __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return user_service_1.UserService; }))),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            jwt_1.JwtService,
            user_service_1.UserService])
    ], JwtAuthGuard);
    return JwtAuthGuard;
}());
exports.JwtAuthGuard = JwtAuthGuard;
