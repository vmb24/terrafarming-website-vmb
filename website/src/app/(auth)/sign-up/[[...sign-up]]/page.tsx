import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { SignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'

import { Container } from "@/components/ui/atoms/Container"

import { MenuItem } from "@/utils/types"
import { HomeHeader } from "@/components/ui/organisms/HomeHeader"

const MENUITEMS: MenuItem[] = [
  { label: 'Entenda a TerraFarming', href: '/site' }
]

export default function SignUpPage() {
  return (
    <>
      <HomeHeader menuItems={MENUITEMS} />
      <Container>        
        <div className='absolute min-h-screen left-0 right-0 top-0 bottom-0 grid grid-cols-1 lg:grid-cols-2'>
          <div className='h-full lg:flex flex-col items-center justify-center px-4'>
            <div className='text-center space-x-4 pt-16'>
              <h1 className='font-bold text-3xl text-[#2E2A47'>
                Bem-vindo de Volta!
              </h1>
              <p className='text-base text-[#7E8CA0]'>
                Faça login ou crie uma conta para voltar ao seu painel de controle
              </p>
            </div>
            <div className='flex items-center justify-center mt-8'>
              <ClerkLoaded>
                <SignUp path="/sign-up"/>
              </ClerkLoaded>
              <ClerkLoading>
                <Loader2 className='animate-spin text-muted-foreground'/>
              </ClerkLoading>    
            </div>
          </div>
          <div className='h-full bg-green-700 hidden lg:flex items-center justify-center'>
            <Image src='/terrafarming-logo.svg' height={300} width={300} alt='logo'/>
          </div>
        </div>
      </Container>
    </>
  ) 
}