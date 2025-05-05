import { useEffect, useState } from "react";
import { VehicleCard } from "../components/VehicleCard";
import { fetchVehicles } from "../services/api";

export default function Garage() {
    const [vehicles, setVehicles ] = useState([]);

    useEffect(() => {
        fetchVehicles().then(setVehicles);
    }, []);

    return (
        <div className="p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {vehicles.map((v: any) => (
            <VehicleCard key={v.plate} vehicle={v} />
        ))}
        </div>
    );
}