"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var auth_controller_1 = require("./auth.controller");
var config_1 = require("@nestjs/config");
var jwt_1 = require("@nestjs/jwt");
var user_module_1 = require("../user/user.module");
var jwt_auth_guard_1 = require("../guard/jwt-auth-guard");
var config_2 = require("../configuration/config");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule,
                jwt_1.JwtModule.register({ secret: config_2.environments.jwtSecretKey }),
                user_module_1.UserModule,
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, jwt_auth_guard_1.JwtAuthGuard],
            exports: [jwt_auth_guard_1.JwtAuthGuard, auth_service_1.AuthService, jwt_1.JwtModule, config_1.ConfigModule, user_module_1.UserModule],
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
