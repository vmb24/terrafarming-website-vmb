import { UserButton } from "@clerk/nextjs"
import MarketplaceRecommendationsLocations from "./components/MarketplaceRecommendationsLocations"
import IAgrixiAssistant from "@/components/ui/agrixi-assistant/IAgrixiAssistant"

const MarketplaceResources = () => {
    return (
        <div className="-mt-12">
            <MarketplaceRecommendationsLocations />

            <IAgrixiAssistant />
        </div>
    )
}

export default MarketplaceResources