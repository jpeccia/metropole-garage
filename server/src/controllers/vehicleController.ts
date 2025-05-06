import { Request, Response } from 'express';
import { vehicleService } from '../services/VehicleService';

export const getAllVehiclesBySteamId = async (req: Request, res: Response) => {
    const { steamId } = req.params;
    try {
        const vehicles = await vehicleService.getVehiclesBySteamId(steamId);
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar veiculos'});
    }
};

export const getVehicleByPlate = async (req: Request, res: Response) => {
    const { licensePlate } = req.params;
    try {
      const vehicle = await vehicleService.getVehicleByPlate(licensePlate);
      if (!vehicle) return res.status(404).json({ error: 'Veículo não encontrado' });
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar veículo' });
    }
};