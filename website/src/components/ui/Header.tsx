import { UserButton } from "@clerk/nextjs"
import { Loader2 } from 'lucide-react'
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'

import { HeaderLogo } from "@/components/ui/HeaderLogo"
import { HeaderNavigation } from "@/components/ui/HeaderNavigation"
import { WelcomeMsg } from "@/components/ui/WelcomeMsg"

export const Header = () => {
    return (
        <header className="
            bg-gradient-to-b from-green-700 to-green-500 px-4 py-8 lg:px-14 pb-36">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="w-full flex items-center justify-between mb-14">
                        <div className="flex items-center lg:gap-x-16">
                            <HeaderLogo />
                            <HeaderNavigation />
                        </div>
                        <ClerkLoaded>
                            <UserButton signInUrl="/sign-in"/>
                        </ClerkLoaded>
                        <ClerkLoading>
                            <Loader2 className="size-8 animate-spin text-slate-400"/>
                        </ClerkLoading>
                    </div>
                    <WelcomeMsg />
                </div>
        </header>
    )
}