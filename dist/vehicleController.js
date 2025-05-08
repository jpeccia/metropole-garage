"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVehicleState = exports.getVehicles = void 0;
const db_1 = require("./db");
const getVehicles = async (identifier) => {
    return await (0, db_1.query)('SELECT * FROM vehicles WHERE owner = ?', [identifier]);
};
exports.getVehicles = getVehicles;
const saveVehicleState = async (plate, state) => {
    await (0, db_1.query)('UPDATE vehicles SET status = ? WHERE plate = ?', [state, plate]);
};
exports.saveVehicleState = saveVehicleState;
