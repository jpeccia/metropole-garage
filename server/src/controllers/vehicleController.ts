import { Request, Response } from 'express';
import { vehicleService } from '../services/VehicleService';
import { prisma } from '../prisma/client';

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

export const getAllVehicles = async (req: Request, res: Response) => {
    try {
      const vehicles = await prisma.vehicle.findMany();
      res.json(vehicles);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar veículos' });
    }
  };
  
  export const spawnVehicle = async (req: Request, res: Response) => {
    const vehicle = req.body;
  
    console.log('Spawning vehicle:', vehicle);
  
    res.status(200).json({ success: true, message: 'Vehicle spawned!' });
  };
