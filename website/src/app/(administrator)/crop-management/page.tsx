import IAgrixiAssistant from "@/components/ui/agrixi-assistant/IAgrixiAssistant";
import HarvestCalendar from "./components/HarvestCalendar";
import SustainableAgricultureSolutions from "./components/SustainableAgricultureSolutions";

const CropManagement: React.FC = () => {
  return (
    <div className="px-4 -mt-20">
      <HarvestCalendar />

      <div>
        <SustainableAgricultureSolutions />
      </div>

      <IAgrixiAssistant />
    </div>
  );
};

export default CropManagement;