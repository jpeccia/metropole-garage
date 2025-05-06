import express from 'express';
import { getAllVehicles, spawnVehicle } from '../controllers/vehicleController';

const router = express.Router();

router.post('/getVehicles', async (req, res) => {
  const vehicles = await getAllVehicles(req, res);
});

router.post('/spawnVehicle', async (req, res) => {
  const result = await spawnVehicle(req, res);
});

export default router;
