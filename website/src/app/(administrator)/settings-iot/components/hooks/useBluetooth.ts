// hooks/useBluetooth.ts
'use client'
import { useState, useEffect } from 'react';

interface BluetoothDevice {
  id: string;
  name: string;
}

export function useBluetooth() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<BluetoothDevice | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'bluetooth' in navigator) {
      setIsAvailable(true);
    }
  }, []);

  const scanDevices = async () => {
    if (!isAvailable) {
      setError('Bluetooth não está disponível neste dispositivo.');
      return;
    }

    try {
      const device = await (navigator as any).bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['generic_access']
      });
      setDevices([{ id: device.id, name: device.name || 'Dispositivo desconhecido' }]);
    } catch (err) {
      setError('Erro ao escanear dispositivos: ' + (err as Error).message);
    }
  };

  const connectToDevice = async (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device) {
      setError('Dispositivo não encontrado');
      return;
    }

    try {
      const bluetoothDevice = await (navigator as any).bluetooth.requestDevice({
        filters: [{ id: device.id }],
        optionalServices: ['generic_access']
      });
      await bluetoothDevice.gatt.connect();
      setSelectedDevice(device);
    } catch (err) {
      setError('Erro ao conectar ao dispositivo: ' + (err as Error).message);
    }
  };

  return { isAvailable, devices, selectedDevice, error, scanDevices, connectToDevice };
}