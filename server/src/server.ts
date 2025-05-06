import { config } from "dotenv";
import express from 'express';
import cors from 'cors';
import vehicleRoutes from "./routes/vehicleRoutes";

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/vehicles', vehicleRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));