import React from 'react'
import { HomeSite } from '@/app/site/HomeSite'

import { Container } from "@/components/ui/atoms/Container"

import { MenuItem } from "@/utils/types"
import { HomeHeader } from "@/components/ui/organisms/HomeHeader"

const MENUITEMS: MenuItem[] = [
  { label: 'Entenda a TerraFarming', href: '/site' }
]

const HomeSitePage = () => {
  return (
    <>    
      <HomeHeader menuItems={MENUITEMS} />
      <Container>
        <HomeSite />
      </Container>
    </>
  )
}

export default HomeSitePage