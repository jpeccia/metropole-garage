import { ThemeProvider } from '@/components/theme-provider';
import { VehicleProvider } from '@/contexts/VehicleContext';
import { VehicleGarage } from '@/components/VehicleGarage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vehicle-garage-theme">
      <VehicleProvider>
        <VehicleGarage />
        <Toaster />
      </VehicleProvider>
    </ThemeProvider>
  );
}

export default App;