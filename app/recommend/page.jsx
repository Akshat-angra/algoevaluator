"use client";

import { useState } from "react";
import SkillForm from "../components/SkillForm";
import RecommendationsList from "../components/RecommendationsList";

export default function RecommendPage() {
    const [recommendations, setRecommendations] = useState([]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Skill-Based Learning Recommendations</h1>
            <SkillForm onRecommend={setRecommendations} />
            <RecommendationsList recommendations={recommendations} />
        </div>
    );
}
