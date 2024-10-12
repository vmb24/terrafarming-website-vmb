import AgricultureReport from "./components/AgricultureReport"
import CropDisplay from "./components/CropCard"

const AgricultureTecnology = () => {
    return (
       <div className="container px-4">
            <CropDisplay />

            <div className="mt-20"> 
                <AgricultureReport />
            </div>
            {/* Outros componentes da página */}
      </div>
    )
}

export default AgricultureTecnology