import { Header } from "@/components/ui/organisms/Header"
import { FooterApplication } from "@/components/ui/templates/FooterApplication"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

type Props = {
    children: React.ReactNode
}

const SettingsLayout = ({ children }: Props) => {
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

export default SettingsLayout