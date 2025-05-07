import { ThemeProvider } from '@/components/theme-provider';
import { VehicleProvider } from '@/contexts/VehicleContext';
import { VehicleGarage } from '@/components/VehicleGarage';
import { Toaster } from '@/components/ui/toaster';
import { useState, useEffect } from 'react';

function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'garage:toggle') {
        setVisible(event.data.show);

        if (event.data.show) {
          fetch('https://metropole_garage/metropole:getSteamId', {
            method: 'POST',
            body: JSON.stringify({})
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!visible) return null;

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