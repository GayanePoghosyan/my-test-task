"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./auth/auth.module");
var user_module_1 = require("./user/user.module");
var mongoose_1 = require("@nestjs/mongoose");
var config_2 = require("./configuration/config");
var stock_controller_1 = require("./stock/stock.controller");
var stock_module_1 = require("./stock/stock.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                auth_module_1.AuthModule,
                user_module_1.UserModule,
                config_1.ConfigModule.forRoot(),
                mongoose_1.MongooseModule.forRoot(config_2.environments.mongoUri, { autoIndex: false }),
                stock_module_1.StockModule,
            ],
            controllers: [app_controller_1.AppController, stock_controller_1.StockController],
            providers: [app_service_1.AppService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
