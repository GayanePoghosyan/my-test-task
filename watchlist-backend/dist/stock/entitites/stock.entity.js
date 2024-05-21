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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockSchema = exports.Stock = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Stock = /** @class */ (function () {
    function Stock() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: true }),
        __metadata("design:type", Object)
    ], Stock.prototype, "userId", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ type: [String] }),
        __metadata("design:type", Array)
    ], Stock.prototype, "symbols", void 0);
    Stock = __decorate([
        (0, mongoose_1.Schema)({
            timestamps: true,
        })
    ], Stock);
    return Stock;
}());
exports.Stock = Stock;
exports.StockSchema = mongoose_1.SchemaFactory.createForClass(Stock);
