import IAgrixiAssistant from "@/components/ui/agrixi-assistant/IAgrixiAssistant"
import AgricultureReport from "./components/AgricultureReport"
import CropDisplay from "./components/CropCard"
import IrrigationSystem from "./components/IrrigationSystem"

const AgricultureTecnology = () => {
    return (
       <div className=" px-4 mb-8">
            <CropDisplay />

            <div className="mt-20">
                <IrrigationSystem />
            </div>

            <div className="mt-20"> 
                <AgricultureReport />
            </div>
            
            <IAgrixiAssistant />
      </div>
    )
}

export default AgricultureTecnology