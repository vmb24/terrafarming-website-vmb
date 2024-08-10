'use client'

import { useState } from 'react'
import { useMedia } from 'react-use'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { NavButton } from '@/components/ui/atoms/NavButton'

import { 
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

const routes = [
    {
        href: '/overview',
        label: 'Overview',
    },
    {
        href: '/planner-task-management',
        label: 'Planner Task Management',
    },
    {
        href: '/farm-health', // Verificação de praga, colheita e funcionamento de equipamentos
        label: 'Farm Health Metrics',
    },
    {
        href: '/improving-soil', // Metricas para melhoria do solo junto com as mudanças climaticas
        label: 'Improving Soil Metrics',
    },
    {
        href: '/greenhouses-control',
        label: 'Greenhouses',
    },
    {
        href: '/cost-management',
        label: 'Cost Management',
    },
    {
        href: '/transactions',
        label: 'Transactions',
    },
    {
        href: '/settings',
        label: 'Settings',
    },
]

export const HeaderNavigation = () => {
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const isMobile = useMedia('(max-width: 1024px)', false)

    const onClick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    }


    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}> 
                <SheetTrigger>
                    <Button 
                        variant='outline'
                        size='sm'
                        className='
                            font-normal 
                            bg-white/10
                            hover:bg-white/20 
                            hover:text-white 
                            border-none 
                            focus-visible:ring-offset-0 
                            focus-visible:ring-transparent
                            outline-none
                            text-white
                            focus:bg-white/20
                            transition'
                        >
                            <Menu className='size-4' />
                    </Button>
                </SheetTrigger>
                <SheetContent side='left' className='bg-white px-2'>
                    <nav className='flex flex-col gap-y-2 pt-6'>
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? 'secondary' : 'ghost'}
                                onClick={() => onClick(route.href)}
                                className='w-full justify-start'
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
                <NavButton 
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                />
            ))}
        </nav>
    )
}