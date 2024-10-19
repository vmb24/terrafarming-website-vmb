import React, { useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

const PersonalProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
  });

  const [editingField, setEditingField] = useState<keyof ProfileData | null>(null);

  const handleEdit = (field: keyof ProfileData) => {
    setEditingField(field);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (field: keyof ProfileData) => {
    setEditingField(null);
    // Aqui você pode implementar a lógica para salvar os dados no backend
    console.log(`Salvando ${field}: ${profileData[field]}`);
  };

  const renderField = (field: keyof ProfileData, label: string, type: string, placeholder: string) => {
    const isEditing = editingField === field;
    return (
      <div className="flex items-center space-x-2">
        <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 mt-8 w-1/4">
          {label}
        </label>
        <input
          type={type}
          id={field}
          name={field}
          value={profileData[field]}
          onChange={handleChange}
          className={`w-1/2 p-3 bg-gray-800 dark:text-white rounded ${isEditing ? 'border-2 border-blue-500' : ''}`}
          placeholder={placeholder}
          readOnly={!isEditing}
        />
        <button
          onClick={() => isEditing ? handleSave(field) : handleEdit(field)}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? <FaSave /> : <FaEdit />}
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Perfil Pessoal</h2>
      <div className="space-y-4">
        {renderField('name', 'Nome Completo', 'text', 'Seu nome completo')}
        {renderField('email', 'Email', 'email', 'seu.email@exemplo.com')}
        {renderField('phone', 'Telefone', 'tel', '(00) 00000-0000')}
        
      </div>
      <button className="bg-green-500 hover:bg-green-600 text-white font-normal py-2 px-4 rounded mt-12">
        Salvar Todas as Alterações
      </button>
    </div>
  );
};

export default PersonalProfile;