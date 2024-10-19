'use client'
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import Sidebar from './components/Sidebar';
import IOTConfig from './components/IOTConfig';
import PersonalProfile from './components/PersonalProfile';
import IOTDeviceLogs from './components/IOTDeviceLogs';
import FarmProfile from './components/FarmProfile';
import ExpenseManagement from './components/ExpenseManagement';
import Subscription from './components/Subscription';
import AlexaIntegration from './components/AlexaIntegration';
import Community from './components/Community';

const SettingsPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('iotconfig');

  const renderContent = () => {
    switch (activeSection) {
      case 'iotconfig': return <IOTConfig />;
      case 'logs': return <IOTDeviceLogs />;
      case 'profile': return <PersonalProfile />;
      case 'farm': return <FarmProfile />;
      case 'expenses': return <ExpenseManagement />;
      case 'subscription': return <Subscription />;
      case 'alexa': return <AlexaIntegration />;
      case 'community': return <Community />;
      default: return <IOTConfig />;
    }
  };

  return (
    <div className="flex h-full bg-gray-100 dark:bg-gray-900 -mt-20 rounded-md">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPage;