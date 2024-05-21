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
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var uuid_1 = require("uuid");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, mongoose_1.Prop)({
            type: String,
            unique: true,
            default: function genUUID() {
                return (0, uuid_1.v4)();
            },
        }),
        __metadata("design:type", String)
    ], User.prototype, "userId", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: false }),
        __metadata("design:type", String)
    ], User.prototype, "sessionToken", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: false }),
        __metadata("design:type", String)
    ], User.prototype, "googleId", void 0);
    User = __decorate([
        (0, mongoose_1.Schema)({
            toJSON: {
                getters: true,
                virtuals: true,
            },
            timestamps: true,
        })
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
