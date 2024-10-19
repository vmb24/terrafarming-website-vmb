import React, { useState } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';

interface FarmData {
  farmName: string;
  location: string;
  size: string;
  mainCrops: string;
}

const FarmProfile: React.FC = () => {
  const [farmData, setFarmData] = useState<FarmData>({
    farmName: '',
    location: '',
    size: '',
    mainCrops: '',
  });

  const [editingField, setEditingField] = useState<keyof FarmData | null>(null);

  const handleEdit = (field: keyof FarmData) => {
    setEditingField(field);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarmData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (field: keyof FarmData) => {
    setEditingField(null);
    // Aqui você pode implementar a lógica para salvar os dados no backend
    console.log(`Salvando ${field}: ${farmData[field]}`);
  };

  const renderField = (field: keyof FarmData, label: string, placeholder: string) => {
    const isEditing = editingField === field;
    return (
      <div className="flex items-center space-x-2">
        <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 mt-4 w-1/4">
          {label}
        </label>
        <input
          type={field === 'size' ? 'number' : 'text'}
          id={field}
          name={field}
          value={farmData[field]}
          onChange={handleChange}
          className={`w-1/2 p-3 dark:bg-gray-800 dark:text-white rounded ${isEditing ? 'border-2 border-blue-500' : ''}`}
          placeholder={placeholder}
          readOnly={!isEditing}
        />
        <button
          onClick={() => isEditing ? handleSave(field) : handleEdit(field)}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? <FaCheck /> : <FaEdit />}
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Perfil da Fazenda</h2>
      <div className="space-y-4">
        {renderField('farmName', 'Nome da Fazenda', 'Nome da sua fazenda')}
        {renderField('location', 'Localização', 'Cidade, Estado')}
        {renderField('size', 'Tamanho da Fazenda (hectares)', '0')}
        {renderField('mainCrops', 'Principais Culturas', 'Ex: Soja, Milho, Trigo')}
        
      </div>
      <button className="mt-12 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Salvar Perfil da Fazenda
      </button>
    </div>
  );
};

export default FarmProfile;