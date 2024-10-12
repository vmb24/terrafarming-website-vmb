'use client';

import { Role } from '@/utils/types'
import { BrandIcon } from './BrandIcon'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export interface IBrandProps {
  className?: string
  shortForm?: boolean
  type?: Role
}

export const Brand = ({
  shortForm = false,
  className,
  type = undefined,
}: IBrandProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`grid place-items-center z-50 ${className}`}>
      <div className="text-xl">
        {shortForm ? (
          <div className="flex items-center gap-2 font-medium tracking-tighter font-playfair">
            <BrandIcon />
            <div>
              <div className="flex gap-1">
                <h1 className='text-green-800 dark:text-green-400 text-sm'>TerraFarming</h1>
                {type ? <span className="text-xs text-gray-600 dark:text-gray-400">{type}</span> : null}
              </div>
              <h1 className="text-xs text-gray-700 dark:text-gray-500">VMB</h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium tracking-tighter font-playfair">
            <BrandIcon />
            <div>
              <div className="flex gap-1">
                <h1 className='text-green-800 dark:text-green-400'>TerraFarming</h1>
                {type ? <span className="text-xs text-gray-600 dark:text-gray-400">{type}</span> : null}
              </div>
              <h1 className="text-xs text-gray-700 dark:text-gray-500">VMB</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}