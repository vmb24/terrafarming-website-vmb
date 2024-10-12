'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Sun, Droplet, Leaf, ArrowUpRight } from 'lucide-react'

interface CropCardProps {
  cropName: string
  imageSrc: string
  irrigationLevel: number
  lightLevel: number
  quality: 'good' | 'medium' | 'bad' | 'none'
}

const CropCard: React.FC<CropCardProps> = ({
  cropName,
  imageSrc,
  irrigationLevel,
  lightLevel,
  quality
}) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getQualityColor = () => {
    switch (quality) {
      case 'good': return 'bg-yellow-400'
      case 'medium': return 'bg-yellow-300'
      case 'bad': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const bgColor = theme === 'dark' ? 'bg-gray-800/80' : 'bg-gray-200/80'
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const iconBgColor = theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-300/50'

  return (
    <div className={`rounded-lg p-4 shadow-lg backdrop-blur-sm ${bgColor} ${textColor} h-full relative overflow-hidden`}>
      <div className="flex items-center mb-3">
        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} p-2 rounded-full mr-3`}>
          <Leaf className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-semibold">{cropName || 'Sem plantação/cultura'}</h3>
        <div className={`absolute top-4 right-4 w-8 h-8 ${getQualityColor()} rounded-full flex items-center justify-center`}>
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="mb-4 flex justify-center items-center">
        {imageSrc ? (
          <img src={imageSrc} alt={cropName} className="w-48 h-48 object-cover rounded-full" />
        ) : (
          <div className={`w-48 h-48 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
            <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg`}>Sem imagem</span>
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-4 absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center">
          <div className={`w-14 h-14 rounded-full backdrop-blur-sm ${iconBgColor} flex items-center justify-center relative overflow-hidden`}>
            <Droplet className="w-7 h-7 z-10" />
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-blue-400 transition-all duration-300 ease-in-out`}
              style={{ height: `${irrigationLevel}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className={`w-14 h-14 rounded-full backdrop-blur-sm ${iconBgColor} flex items-center justify-center relative overflow-hidden`}>
            <Sun className="w-7 h-7 z-10" />
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-yellow-400 transition-all duration-300 ease-in-out`}
              style={{ height: `${lightLevel}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CropDisplay: React.FC = () => {
  const crops = [
    { cropName: 'Alface americana', imageSrc: '/images/lettuce.png', irrigationLevel: 75, lightLevel: 60, quality: 'good' as const },
    { cropName: 'Tomate', imageSrc: '/images/tomato.png', irrigationLevel: 45, lightLevel: 80, quality: 'medium' as const },
    { cropName: 'Cenoura', imageSrc: '/images/carrot.png', irrigationLevel: 60, lightLevel: 70, quality: 'good' as const },
    { cropName: 'Espinafre', imageSrc: '/images/spinach.png', irrigationLevel: 80, lightLevel: 50, quality: 'bad' as const },
    { cropName: 'Sem plantação/cultura', imageSrc: '', irrigationLevel: 0, lightLevel: 0, quality: 'none' as const },
  ]

  return (
    <div className="w-full -mt-20">
      <div className="flex gap-3">
        {crops.map((crop, index) => (
          <div key={index} className="flex-1 min-w-[300px]">
            <CropCard {...crop} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CropDisplay