"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const query = (sql, values) => {
    return global.exports.oxmysql.query(sql, values);
};
exports.query = query;
