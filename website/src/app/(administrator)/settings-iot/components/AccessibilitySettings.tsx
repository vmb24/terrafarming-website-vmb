// components/ui/organisms/AccessibilitySettings.tsx
'use client'

import React from 'react';
import { Volume2, EyeOff, Eye, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AccessibilitySettings: React.FC = () => {
    return (
        <div className="px-6 py-8 lg:px-14 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">Acessibilidade</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Card para Modo de Alto Contraste */}
                <div className="bg-gradient-to-b from-green-600 to-green-400 dark:from-green-900 dark:to-green-700 p-6 rounded-lg shadow-lg text-white">
                    <EyeOff className="h-16 w-16 mx-auto mb-4" aria-hidden="true"/>
                    <h3 className="text-lg font-semibold text-center mb-2">Modo de Alto Contraste</h3>
                    <p className="text-center text-gray-200">Ative cores mais intensas para melhorar a visualização.</p>
                    <Button className="mt-4 w-full bg-white text-green-700 dark:bg-green-800 dark:text-green-100">
                        Ativar
                    </Button>
                </div>
                
                {/* Card para Narrador de Tela */}
                <div className="bg-gradient-to-b from-blue-600 to-blue-400 dark:from-blue-900 dark:to-blue-700 p-6 rounded-lg shadow-lg text-white">
                    <Volume2 className="h-16 w-16 mx-auto mb-4" aria-hidden="true"/>
                    <h3 className="text-lg font-semibold text-center mb-2">Narrador de Tela</h3>
                    <p className="text-center text-gray-200">Ouça a descrição das funcionalidades do aplicativo.</p>
                    <Button className="mt-4 w-full bg-white text-blue-700 dark:bg-blue-800 dark:text-blue-100">
                        Ativar
                    </Button>
                </div>
                
                {/* Card para Suporte a Linguagem de Sinais */}
                <div className="bg-gradient-to-b from-purple-600 to-purple-400 dark:from-purple-900 dark:to-purple-700 p-6 rounded-lg shadow-lg text-white">
                    <VolumeX className="h-16 w-16 mx-auto mb-4" aria-hidden="true"/>
                    <h3 className="text-lg font-semibold text-center mb-2">Suporte a Linguagem de Sinais</h3>
                    <p className="text-center text-gray-200">Assista a vídeos explicativos em Libras.</p>
                    <Button className="mt-4 w-full bg-white text-purple-700 dark:bg-purple-800 dark:text-purple-100">
                        Ativar
                    </Button>
                </div>

                {/* Card para Ampliar Texto */}
                <div className="bg-gradient-to-b from-yellow-600 to-yellow-400 dark:from-yellow-900 dark:to-yellow-700 p-6 rounded-lg shadow-lg text-white">
                    <Eye className="h-16 w-16 mx-auto mb-4" aria-hidden="true"/>
                    <h3 className="text-lg font-semibold text-center mb-2">Ampliar Texto</h3>
                    <p className="text-center text-gray-200">Aumente o tamanho do texto para melhor leitura.</p>
                    <Button className="mt-4 w-full bg-white text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100">
                        Ativar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AccessibilitySettings;
