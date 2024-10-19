import React from 'react';
import { FaWifi, FaClipboardList, FaUser, FaLeaf, FaMoneyBillWave, FaCrown, FaAmazon, FaDiscord } from 'react-icons/fa';
import { Eye } from 'lucide-react';
import { MdPayment } from "react-icons/md";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: 'iotconfig', icon: FaWifi, label: 'Configuração IOT' },
  { id: 'logs', icon: FaClipboardList, label: 'Logs do Dispositivo' },
  { id: 'profile', icon: FaUser, label: 'Perfil Pessoal' },
  { id: 'accessibility-settings', icon: Eye, label: 'Acessibilidade Pessoal' },
  { id: 'farm', icon: FaLeaf, label: 'Perfil da Fazenda' },
  { id: 'expenses', icon: FaMoneyBillWave, label: 'Gerenciamento de Gastos' },
  { id: 'subscription', icon: FaCrown, label: 'Plano de Assinatura' },
  { id: 'alexa', icon: FaAmazon, label: 'Integração Alexa' },
  { id: 'community', icon: FaDiscord, label: 'Comunidade' },
  { id: 'payment', icon: MdPayment, label: 'Métodos de Pagamento' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md pb-8">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Configurações</h2>
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center w-full px-4 py-2 text-left ${
              activeSection === item.id
                ? 'bg-green-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon className="mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;