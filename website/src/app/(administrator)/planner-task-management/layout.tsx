import { Header } from "@/components/ui/organisms/Header"

type Props = {
    children: React.ReactNode
}

const TaskManagementLayout = ({ children }: Props) => {
    return (
        <>  
            <Header />
            <main className="px-3 lg:px-14">
                {children}
            </main>
        </>
    )
}

export default TaskManagementLayout