'use client'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { SlideHomePage } from '../organisms/SlideHomePage'

export const Home = () => {
  return (
    <main className="h-[calc(100vh-4rem)] ">
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <SlideHomePage />
      </div>
      <div className="flex flex-col items-start space-y-2 font-black text-white text-5xl mt-20">
        <div className="bg-green-700 z-10 inline-block px-3 bg-primary mt-2">Mente nenhuma imaginou</div>{' '}
        <div className="bg-green-700 z-10 inline-block w-full max-w-md px-3 bg-primary text-white">
          as vantagens do TerraFarming!
        </div>
        <Link
          href="/search"
          className="bg-green-700 z-10 flex items-center gap-2 px-3 py-2 text-xl font-medium text-white underline underline-offset-4 bg-primary"
        >
          <IconSearch color='white' />
          <h1 className='bg-green-700 text-white'>Faça parte dessa inteligência!</h1>
        </Link>
      </div>
    </main>
  )
}