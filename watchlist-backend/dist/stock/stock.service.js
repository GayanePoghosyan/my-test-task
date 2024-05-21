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
exports.StockService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var mongoose_1 = require("mongoose");
var mongoose_2 = require("@nestjs/mongoose");
var config_1 = require("../configuration/config");
var stock_entity_1 = require("./entitites/stock.entity");
var StockService = /** @class */ (function () {
    function StockService(stockModel) {
        this.stockModel = stockModel;
        this.logger = new common_1.Logger(StockService_1.name);
        this.createStockObject = function (data, symbol) { return ({
            currentPrice: data.c,
            change: data.d,
            changePercent: data.dp,
            componyName: data.companyName || '',
            symbol: symbol,
            timestamp: data.t,
            logo: data.logo || ''
        }); };
    }
    StockService_1 = StockService;
    StockService.prototype.getBySymbol = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var response, stockData, stock, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(config_1.environments.finnhubAPIUrl + '/quote', {
                                params: {
                                    symbol: symbol,
                                    token: config_1.environments.apiSecretKey,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        stockData = response.data;
                        stock = this.createStockObject(stockData, symbol);
                        return [2 /*return*/, JSON.stringify(stock)];
                    case 2:
                        error_1 = _a.sent();
                        this.logger.error(JSON.stringify(error_1));
                        throw new common_1.InternalServerErrorException('Error fetching data from finnhub');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StockService.prototype.createOrupdate = function (userId, stockData) {
        return __awaiter(this, void 0, void 0, function () {
            var action, symbol, stock, index, data, data, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        action = stockData.action, symbol = stockData.symbol;
                        return [4 /*yield*/, this.stockModel.findOne({ userId: userId })];
                    case 1:
                        stock = _b.sent();
                        if (!stock) return [3 /*break*/, 3];
                        index = (_a = stock.symbols) === null || _a === void 0 ? void 0 : _a.indexOf(symbol);
                        if (action === 'delete' && index > -1) {
                            stock.symbols.splice(index, 1);
                        }
                        else if (action === 'add' && index === -1) {
                            stock.symbols.push(symbol);
                        }
                        return [4 /*yield*/, this.stockModel.findByIdAndUpdate(stock === null || stock === void 0 ? void 0 : stock._id, stock)];
                    case 2:
                        data = _b.sent();
                        return [2 /*return*/, data];
                    case 3:
                        if (!(action === 'add')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.stockModel.create({
                                userId: userId,
                                symbols: [symbol]
                            })];
                    case 4:
                        data = _b.sent();
                        return [2 /*return*/, data];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        throw new Error('Invalid action or no changes made');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    StockService.prototype.getByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var stock, symbols, promises, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.stockModel.findOne({ userId: userId })];
                    case 1:
                        stock = _a.sent();
                        if (!stock) {
                            throw new common_1.NotFoundException("Stock data not found");
                        }
                        symbols = stock.symbols;
                        promises = symbols === null || symbols === void 0 ? void 0 : symbols.map(function (symbol) { return __awaiter(_this, void 0, void 0, function () {
                            var resp, company, sockObject;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, axios_1.default.get(config_1.environments.finnhubAPIUrl + '/quote', {
                                            params: {
                                                symbol: symbol,
                                                token: config_1.environments.apiSecretKey,
                                            },
                                        })];
                                    case 1:
                                        resp = _c.sent();
                                        return [4 /*yield*/, axios_1.default.get(config_1.environments.finnhubAPIUrl + '/stock/profile2', {
                                                params: {
                                                    symbol: symbol,
                                                    token: config_1.environments.apiSecretKey,
                                                },
                                            })];
                                    case 2:
                                        company = _c.sent();
                                        if (company === null || company === void 0 ? void 0 : company.data) {
                                            resp.data.companyName = (_a = company === null || company === void 0 ? void 0 : company.data) === null || _a === void 0 ? void 0 : _a.name;
                                            resp.data.logo = (_b = company === null || company === void 0 ? void 0 : company.data) === null || _b === void 0 ? void 0 : _b.logo;
                                        }
                                        sockObject = this.createStockObject(resp === null || resp === void 0 ? void 0 : resp.data, symbol);
                                        return [2 /*return*/, sockObject];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_3 = _a.sent();
                        this.logger.error(JSON.stringify(error_3));
                        if (error_3 instanceof common_1.NotFoundException) {
                            throw error_3;
                        }
                        throw new common_1.InternalServerErrorException('Error fetching data by userId');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var StockService_1;
    StockService = StockService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_2.InjectModel)(stock_entity_1.Stock.name)),
        __metadata("design:paramtypes", [mongoose_1.Model])
    ], StockService);
    return StockService;
}());
exports.StockService = StockService;
