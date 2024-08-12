import { Role } from '@/utils/types'
import { BrandIcon } from './BrandIcon'

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
  return (
    <div className={`grid place-items-center z-50 ${className}`}>
      <div className="text-xl ">
        {shortForm ? (
          <div className="flex items-center gap-2 font-medium tracking-tighter font-playfair">
          <BrandIcon />
          <div>
              <div className="flex gap-1">
                <h1 className='text-green-700 text-sm'>TerraFarming</h1>
                {type ? <span className="text-xs">{type}</span> : null}
              </div>
              <h1 className="text-xs text-gray-500">VMB</h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium tracking-tighter font-playfair">
            <BrandIcon />
            <div>
              <div className="flex gap-1">
                <h1 className='text-green-700'>TerraFarming</h1>
                {type ? <span className="text-xs">{type}</span> : null}
              </div>
              <h1 className="text-xs text-gray-500">VMB</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
