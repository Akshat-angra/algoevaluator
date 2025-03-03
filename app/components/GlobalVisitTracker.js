"use client";

import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const GlobalVisitTracker = () => {
    const [dailyVisits, setDailyVisits] = useState(0);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const lastVisitDate = localStorage.getItem("lastVisitDate");

        if (lastVisitDate !== today) {
            fetch("/api/track", { method: "POST" })
                .then(res => res.json())
                .then(data => {
                    setDailyVisits(data.dailyVisits);
                    localStorage.setItem("lastVisitDate", today);
                })
                .catch(err => console.error("Error updating visits:", err));
        } else {
            fetch("/api/track", { method: "GET" })
                .then(res => res.json())
                .then(data => setDailyVisits(data.dailyVisits))
                .catch(err => console.error("Error fetching visits:", err));
        }
    }, []);

    return (
        <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-white" />
            <span className="text-xs tracking-wide">
                Total Page Visits:{" "}
                <CountUp
                    start={dailyVisits > 0 ? dailyVisits - 10 : 0}
                    end={dailyVisits}
                    duration={2}
                    separator=","
                />
            </span>
        </div>
    );
};

export default GlobalVisitTracker;