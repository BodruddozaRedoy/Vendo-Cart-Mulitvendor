"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
let connectingPromise = null;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // Skip when no URI configured (avoid crashing serverless at import time)
    if (!env_1.default.MONGO_URI) {
        console.warn('MONGO_URI not set — skipping DB connection');
        return;
    }
    // Reuse existing connection if already connected or connecting
    if (mongoose_1.default.connection.readyState === 1)
        return; // connected
    if (connectingPromise)
        return connectingPromise;
    try {
        connectingPromise = mongoose_1.default.connect(env_1.default.MONGO_URI, { dbName: 'vendorCartDB' });
        const conn = yield connectingPromise;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Mongo connection error: ${error.message}`);
    }
    finally {
        connectingPromise = null;
    }
});
exports.default = connectDB;
