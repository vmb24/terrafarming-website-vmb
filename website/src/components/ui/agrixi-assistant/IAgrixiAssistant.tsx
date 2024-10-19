'use client'

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sparkles } from 'lucide-react';  // Ícone de brilho

const IAgrixiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('Aqui estará a mensagem gerada pela inteligência artificial...');
  const { theme } = useTheme();

  const toggleAssistant = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const cards = [
    { icon: '📊', title: 'Métricas de Solo', description: 'Monitore umidade, pH, e temperatura com dados em tempo real dos sensores IoT.' },
    { icon: '🌱', title: 'Saúde das Plantas', description: 'Receba análises detalhadas e previsões sobre a saúde das suas culturas com base nos dados coletados.' },
    { icon: '🗓️', title: 'Plano de Tarefas', description: 'Organize e programe tarefas agrícolas, como irrigação, fertilização e colheita, com base em métricas e previsões.' },
    { icon: '🚜', title: 'Gestão de Recursos', description: 'Controle insumos, como água e fertilizantes, e otimize o uso de recursos em sua fazenda.' },
    { icon: '🛒', title: 'Marketplace Agrícola', description: 'Encontre e adquira insumos, ferramentas e tecnologias agrícolas diretamente no marketplace.' },
    { icon: '🌦️', title: 'Previsões Climáticas', description: 'Receba previsões detalhadas do clima para planejar melhor as atividades agrícolas.' },
  ];

  return (
    <>
      <button
        onClick={toggleAssistant}
        className="fixed bottom-8 right-24 text-white rounded-full p-6 shadow-lg transition-all duration-300 z-50 w-24 h-24 flex items-center justify-center hover:scale-110 ai-gradient-bg"
        aria-label="Open Agrixi Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative w-full max-w-4xl h-[90vh] m-4">
            <div className="absolute inset-0 overflow-hidden rounded-lg" style={{ margin: '-12px' }}>
              <div className="colorful-border"></div>
            </div>
            <div className="relative z-10 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl h-full p-6 flex flex-col">
              <h2 className="text-2xl font-bold mb-6 text-white">Explore</h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {cards.map((card, index) => (
                  <div key={index} className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <div className="text-3xl mb-2">{card.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
                    <p className="text-sm text-gray-300">{card.description}</p>
                  </div>
                ))}
              </div>

              {/* Campo de mensagem da IA */}
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 flex items-center mb-4 h-full">
                <Sparkles className="h-6 w-6 text-gray-400 mr-3" />
                <p className="text-gray-300 italic">{aiMessage}</p>
              </div>

              <div className="mt-auto">
                <div className="bg-gray-700 bg-opacity-50 rounded-full overflow-hidden flex items-center p-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-grow px-4 py-2 bg-transparent focus:outline-none text-white"
                  />
                  <button
                    className="colorful-button text-white px-6 py-2 rounded-full"
                    onClick={() => {
                      console.log(message);
                      setMessage('');
                    }}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white z-20"
              aria-label="Close Agrixi Assistant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .ai-gradient-bg {
          background: linear-gradient(135deg, #1a365d, #2f855a);
          box-shadow: 0 0 20px rgba(26, 54, 93, 0.5), 0 0 40px rgba(47, 133, 90, 0.3);
        }
        .colorful-border {
          position: absolute;
          inset: -5%;
          background: linear-gradient(
            45deg,
            rgba(0, 128, 255, 0.5),
            rgba(0, 255, 128, 0.5),
            rgba(255, 0, 128, 0.5),
            rgba(128, 0, 255, 0.5)
          );
          filter: blur(15px);
          opacity: 0.8;
          animation: rotate 30s linear infinite;
        }

        .colorful-button {
          background: linear-gradient(
            45deg,
            rgba(0, 128, 255, 1),
            rgba(0, 255, 128, 1),
            rgba(255, 0, 128, 1),
            rgba(128, 0, 255, 1)
          );
          background-size: 300% 300%;
          animation: gradient 15s ease infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default IAgrixiAssistant;
