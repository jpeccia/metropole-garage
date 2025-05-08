"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (source) => {
    return IsPlayerAceAllowed(String(source), 'metropole.admin');
};
exports.isAdmin = isAdmin;
