import { UserButton } from "@clerk/nextjs"
import MarketplaceRecommendationsLocations from "./components/MarketplaceRecommendationsLocations"

const MarketplaceResources = () => {
    return (
        <div className="-mt-12">
            <MarketplaceRecommendationsLocations />
        </div>
    )
}

export default MarketplaceResources