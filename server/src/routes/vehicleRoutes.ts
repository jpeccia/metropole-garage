import express from 'express';
import { getAllVehiclesBySteamId, getVehicleByPlate } from '../controllers/vehicleController';

const router = express.Router();

router.get('/player/:steamId', getAllVehiclesBySteamId);
router.get('/plate/:licensePlate', getVehicleByPlate);

export default router;
