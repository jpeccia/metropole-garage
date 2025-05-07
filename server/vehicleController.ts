import { query } from './db';

export const getVehicles = async (identifier: string) => {
  return await query('SELECT * FROM vehicles WHERE owner = ?', [identifier]);
};

export const saveVehicleState = async (plate: string, state: string) => {
  await query('UPDATE vehicles SET status = ? WHERE plate = ?', [state, plate]);
};
