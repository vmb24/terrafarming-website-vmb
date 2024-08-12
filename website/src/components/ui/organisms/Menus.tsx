import { MenuItem } from '@/utils/types'
import Link from 'next/link'

export interface IMenuItemProps {
  menuItems: MenuItem[]
}

export const Menus = ({ menuItems }: IMenuItemProps) => {
  return (
    <>
      {menuItems.map(({ label, href }) => (
        <Link
          className="hover:underline underline-offset-8 transition-all font-normal text-base text-black max-md:hidden max-lg:hidden"
          key={label}
          href={href}
        >
          {label}
        </Link>
      ))}
    </>
  )
}
