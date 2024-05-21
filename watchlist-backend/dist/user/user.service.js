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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var bcrypt_1 = require("bcrypt");
var class_validator_1 = require("class-validator");
var user_entity_1 = require("./entities/user.entity");
var UserService = /** @class */ (function () {
    function UserService(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    UserService_1 = UserService;
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({ email: email })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.findBy = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var field = _b.field;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne(field)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    UserService.prototype.validateUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userModel.findOne({ userId: userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User not found. UserId: ".concat(userId));
                        }
                        return [2 /*return*/, user];
                    case 2:
                        error_1 = _a.sent();
                        this.logger.error(error_1.toString());
                        if (error_1 instanceof common_1.NotFoundException) {
                            throw error_1;
                        }
                        throw new common_1.InternalServerErrorException({
                            message: 'Unable to get user due to an unknown error',
                            error: error_1
                        });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.validatePassword = function (password, currentPassword) {
        return (0, bcrypt_1.compareSync)(password, currentPassword || '');
    };
    UserService.prototype.hashPassword = function (password) {
        try {
            return (0, bcrypt_1.hashSync)(password, 10);
        }
        catch (error) {
            this.logger.error(error.toString());
            throw error;
        }
    };
    UserService.prototype.create = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var createdUser, validationErrors, user, error_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        createdUser = new this.userModel({
                            firstName: body.firstName,
                            lastName: body.lastName,
                            email: (_a = body.email) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim(),
                            password: this.hashPassword(body.password),
                            googleId: (_b = body.googleId) !== null && _b !== void 0 ? _b : ''
                        });
                        return [4 /*yield*/, (0, class_validator_1.validate)(createdUser)];
                    case 1:
                        validationErrors = _c.sent();
                        if (validationErrors.length > 0) {
                            throw new common_1.UnprocessableEntityException({
                                success: false,
                                errors: validationErrors
                            });
                        }
                        user = createdUser.save();
                        return [2 /*return*/, user];
                    case 2:
                        error_2 = _c.sent();
                        this.logger.error(error_2.toString());
                        if (error_2 instanceof common_1.UnprocessableEntityException) {
                            throw error_2;
                        }
                        throw new common_1.InternalServerErrorException('Unable to register a new user due to an unknown error');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.update = function (id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, updatedUser, validationErrors, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findById({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with the specified Id: ".concat(id, " was not found"));
                        }
                        updatedUser = new this.userModel({
                            firstName: updateUserDto.firstName,
                            lastName: updateUserDto.lastName,
                            email: updateUserDto.email.toLowerCase().trim(),
                        });
                        return [4 /*yield*/, (0, class_validator_1.validate)(updatedUser, {
                                skipUndefinedProperties: true
                            })];
                    case 2:
                        validationErrors = _a.sent();
                        if (validationErrors.length > 0) {
                            throw new common_1.UnprocessableEntityException({
                                success: false,
                                errors: validationErrors
                            });
                        }
                        return [4 /*yield*/, this.userModel.findByIdAndUpdate(id, updatedUser)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_3 = _a.sent();
                        this.logger.error(error_3.toString());
                        if (error_3 instanceof common_1.NotFoundException || error_3 instanceof common_1.UnprocessableEntityException) {
                            throw error_3;
                        }
                        throw new common_1.InternalServerErrorException('Unable to update user data due to an unknown error');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    var UserService_1;
    UserService = UserService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
        __metadata("design:paramtypes", [mongoose_2.Model])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
