import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { VehicleProvider } from '@/contexts/VehicleContext';
import { VehicleGarage } from '@/components/VehicleGarage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, show } = event.data;

      if (type === 'garage:toggle') {
        setVisible(show);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = visible ? '#1a1a1a' : 'transparent';
  }, [visible]);

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
