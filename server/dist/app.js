"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
// import connectDB from './config/db';
// import errorMiddleware from './middleware/error.middleware';
// Import routes
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const vendor_routes_1 = __importDefault(require("./modules/vendor/vendor.routes"));
const product_routes_1 = __importDefault(require("./modules/products/product.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
// Import other routes...
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Database connection
(0, db_1.default)();
// Routes
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/vendors', vendor_routes_1.default);
app.use('/api/v1/products', product_routes_1.default);
// Use other routes...
// Error handling middleware
app.use(error_middleware_1.errorMiddleware);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
exports.default = app;
