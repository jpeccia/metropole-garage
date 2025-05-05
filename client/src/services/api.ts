export const fetchVehicles = async () => {
    const res = await fetch("/garage:getVehicles", {
        method: "POST",
        body: JSON.stringify({}),
    });
    return res.json();
};

export const spawnVehicle = async (plate: string) => {
    await fetch("/garage:spawnVehicle", {
        method: "POST",
        body: JSON.stringify({ plate }),
    });
};