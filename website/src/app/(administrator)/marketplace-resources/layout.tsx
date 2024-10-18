import { Header } from "@/components/ui/organisms/Header"
import { FooterApplication } from "@/components/ui/templates/FooterApplication"

type Props = {
    children: React.ReactNode
}

const MarketplaceResourcesLayout = ({ children }: Props) => {
    return (
        <>  
            <Header />
            <main className="px-3 lg:px-14">
                {children}
            </main>
            <FooterApplication />
        </>
    )
}

export default MarketplaceResourcesLayout