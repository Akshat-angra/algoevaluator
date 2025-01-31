"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import ClipLoader from "react-spinners/ClipLoader";
import { RiCodeBoxLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { MdOutlineAssessment } from "react-icons/md";

function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [assessments, setAssessments] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Neon DB fetching logic here
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsDataLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsDataLoading(false);
      }
    };

    if (isSignedIn) {
      fetchData();
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }

  const firstName =
    user?.firstName?.charAt(0).toUpperCase() +
    user?.firstName?.slice(1).toLowerCase();

  if (!isSignedIn) {
    return;
  }

  const LoadingCard = () => (
    <div className="flex items-center justify-center h-32 bg-zinc-900/50 border border-zinc-800 rounded-xl">
      <ClipLoader color="#ffffff" size={30} />
    </div>
  );

  const NoDataCard = ({ message, type }) => {
    const illustrations = {
      assessments: <MdOutlineAssessment className="w-16 h-16 text-zinc-700" />,
      candidates: <BsPeople className="w-16 h-16 text-zinc-700" />,
      coding: <RiCodeBoxLine className="w-16 h-16 text-zinc-700" />,
    };

    return (
      <div className="flex flex-col items-center justify-center h-[64] bg-zinc-900/50 border border-zinc-800 rounded-xl p-2 mt-4 text-center">
        <div className="mb-4 transform transition-all duration-200 hover:scale-110">
          {illustrations[type]}
        </div>
        <p className="text-zinc-400 text-sm">{message}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-zinc-800 bg-black/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">
                AlgoHire Dashboard
              </h1>
              {isDataLoading && (
                <span className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-400">
                  Syncing data...
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-zinc-400">
                {new Date().toLocaleDateString()}
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {firstName?.[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-bold text-white">
              Welcome back, {firstName}
            </h2>
            <p className="text-zinc-400">
              {isDataLoading
                ? "Loading your recruitment analytics..."
                : "Here's an overview of your hiring pipeline."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isDataLoading ? (
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : (
              <>
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl h-[56]">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <MdOutlineAssessment className="w-4 h-4 text-purple-500" />
                    </div>
                    <h3 className="text-zinc-400 font-medium">
                      Active Assessments
                    </h3>
                  </div>
                  {assessments ? (
                    <>
                      <p className="text-3xl font-bold text-white mt-4">
                        {assessments.active}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">
                        {assessments.pending} pending reviews
                      </p>
                    </>
                  ) : (
                    <NoDataCard
                      message="Create your first assessment"
                      type="assessments"
                    />
                  )}
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl h-[56]">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <BsPeople className="w-4 h-4 text-blue-500" />
                    </div>
                    <h3 className="text-zinc-400 font-medium">
                      Active Candidates
                    </h3>
                  </div>
                  {candidates ? (
                    <>
                      <p className="text-3xl font-bold text-white mt-4">
                        {candidates.total}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">
                        {candidates.inProgress} in progress
                      </p>
                    </>
                  ) : (
                    <NoDataCard
                      message="Invite candidates to start"
                      type="candidates"
                    />
                  )}
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl h-[56]">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <RiCodeBoxLine className="w-4 h-4 text-green-500" />
                    </div>
                    <h3 className="text-zinc-400 font-medium">
                      Coding Challenges
                    </h3>
                  </div>
                  {assessments ? (
                    <>
                      <p className="text-3xl font-bold text-white mt-4">
                        {assessments.completed}
                      </p>
                      <p className="text-sm text-green-500 mt-1">
                        ↑ {assessments.completionRate}% completion rate
                      </p>
                    </>
                  ) : (
                    <NoDataCard
                      message="Create coding challenges"
                      type="coding"
                    />
                  )}
                </div>
              </>
            )}
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Hiring Pipeline Status
                </h3>
                <p className="text-zinc-400">
                  {isDataLoading
                    ? "Analyzing your recruitment data..."
                    : "Your hiring pipeline is ready for new candidates."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Recent Activities
              </h2>
              {isDataLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-16 bg-zinc-800/50 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : activities ? (
                <div className="space-y-6">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <div className="flex-1">
                        <p className="text-zinc-300">{activity.description}</p>
                        <p className="text-sm text-zinc-500">{activity.time}</p>
                      </div>
                      <div className="text-zinc-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12">
                  <NoDataCard
                    message="No recent recruitment activities"
                    type="assessments"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
