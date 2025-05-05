type Vehicle = {
    plate: string;
    model: string;
    color: string;
};

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">{vehicle.model}</h2>
            <p>Placa: {vehicle.plate}</p>
            <p>Cor: {vehicle.color}</p>
            <button
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                onClick={() => spawnVehicle(vehicle.plate)}
                >
                Spawnar
            </button>
        </div>
    )
}