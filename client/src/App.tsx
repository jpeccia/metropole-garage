import React, { useEffect, useState } from 'react';
import { VehicleCard } from './components/VehicleCard';

function App() {
  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    fetchNui("garage:getVehicles", {}).then(setVehicle);
  }, []);

  return (
    <div className="p-4 text-white bg-zinc-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Minha Garagem</h1>
      <VehicleCard vehicle={{ vehicle }} />
    </div>
  );
}

const fetchNui = async (event: string, data: any) => {
  const res = await fetch(`https://${GetParentResourceName()}/${event}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export default App;
function GetParentResourceName() {
  throw new Error('Function not implemented.');
}

