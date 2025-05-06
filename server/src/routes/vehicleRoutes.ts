import express from 'express';
import { getAllVehiclesBySteamId, getVehicleByPlate, getAllVehicles, spawnVehicle } from '../controllers/vehicleController';

const router = express.Router();

router.get('/', getAllVehicles); 
router.get('/player/:steamId', getAllVehiclesBySteamId);
router.get('/plate/:licensePlate', getVehicleByPlate);   

// Recebe POST do front para spawnar o veículo
router.post('/spawn', spawnVehicle);

export default router;
