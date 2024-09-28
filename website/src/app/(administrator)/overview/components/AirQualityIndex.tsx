// components/AirQualityIndex.tsx
import React from 'react';

interface AirQualityIndexProps {
    aqi: number | null;
}

const AirQualityIndex: React.FC<AirQualityIndexProps> = ({ aqi }) => {
    const getAQIColor = (aqi: number) => {
        if (aqi <= 50) return 'bg-green-500';
        if (aqi <= 100) return 'bg-yellow-500';
        if (aqi <= 150) return 'bg-orange-500';
        if (aqi <= 200) return 'bg-red-500';
        return 'bg-purple-500';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Índice de Qualidade do Ar</h2>
            {aqi !== null ? (
                <>
                    <div className={`text-3xl font-bold ${getAQIColor(aqi)} text-white p-2 rounded-lg text-center`}>
                        {aqi}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                        {aqi <= 50 ? 'Bom' : aqi <= 100 ? 'Moderado' : aqi <= 150 ? 'Insalubre para grupos sensíveis' : aqi <= 200 ? 'Insalubre' : 'Muito insalubre'}
                    </p>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default AirQualityIndex;