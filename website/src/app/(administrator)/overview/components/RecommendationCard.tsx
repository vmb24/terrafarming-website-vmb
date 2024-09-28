// components/RecommendationCard.tsx
import React from 'react';

interface RecommendationCardProps {
    recommendation: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <p className="text-sm">{recommendation}</p>
        </div>
    );
};

export default RecommendationCard;
