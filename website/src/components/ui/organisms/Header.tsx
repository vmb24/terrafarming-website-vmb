// components/ui/organisms/Header.tsx
'use client'
import { UserButton } from "@clerk/nextjs"
import { Loader2, Moon, Sun } from 'lucide-react'
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { useTheme } from 'next-themes'

import { Brand } from "@/components/ui/atoms/Brand"
import { HeaderNavigation } from "@/components/ui/organisms/HeaderNavigation"
import { WelcomeMsg } from "@/components/ui/templates/WelcomeMsg"
import { Button } from "@/components/ui/button"

export const Header = () => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="px-4 py-8 lg:px-14 pb-36 bg-gradient-to-b from-green-700 to-green-500 dark:from-green-900 dark:to-green-700">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <Brand />
                        <HeaderNavigation />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <Button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            variant="outline" 
                            size="icon" 
                            className="bg-white/10 hover:bg-white/20 text-white dark:bg-green-800 dark:hover:bg-green-700 dark:text-green-100"
                        >
                            {theme === 'dark' 
                                ? <Sun className="h-[1.2rem] w-[1.2rem]" />
                                : <Moon className="h-[1.2rem] w-[1.2rem]" />
                            }
                        </Button>
                        <ClerkLoaded>
                            <UserButton 
                                signInUrl="/sign-in"
                                appearance={{
                                    elements: {
                                        avatarBox: "border-2 border-white dark:border-green-200"
                                    }
                                }}
                            />
                        </ClerkLoaded>
                        <ClerkLoading>
                            <Loader2 className="size-8 animate-spin text-white dark:text-green-200"/>
                        </ClerkLoading>
                    </div>
                </div>
                <WelcomeMsg />
            </div>
        </header>
    )
}