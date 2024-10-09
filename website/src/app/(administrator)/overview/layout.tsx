// app/(platform)/layout.tsx
import { ThemeProvider } from "@/components/ui/layout/ThemeProvider"
import { Header } from "@/components/ui/organisms/Header"

type Props = {
    children: React.ReactNode
}

const OverviewLayout = ({ children }: Props) => {
    return (
        <div>
            <Header />
            <main className="px-3 lg:px-14">
                {children}
            </main>
        </div>
    )
}

export default OverviewLayout