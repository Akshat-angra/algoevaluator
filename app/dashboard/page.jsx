// "use client";
// import React, { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { ClipLoader } from "react-spinners";
// import { FiActivity, FiAlertCircle } from "react-icons/fi";
// import { RiCodeBoxLine, RiDashboardLine } from "react-icons/ri";
// import { BsPeople, BsDatabase } from "react-icons/bs";
// import { MdOutlineAssessment, MdOutlineLeaderboard } from "react-icons/md";
// import { connectToDB } from "@/lib/mongodb";
// import { FooterSection } from "../components/footer/FooterSection";
// import UserGreeting from "../components/UserGreeting";
// import Link from "next/link";

// // Component for displaying custom messages when no data is available
// const EmptyStateCard = ({ title, message, icon, actionText = "Get Started" }) => (
//   <div className="flex flex-col items-center justify-center h-full py-8 text-center">
//     <div className="p-4 bg-zinc-800/40 rounded-full mb-4">
//       {icon}
//     </div>
//     <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
//     <p className="text-zinc-400 text-sm max-w-xs mb-4">{message}</p>
//     <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-sm font-medium text-white">
//       {actionText}
//     </button>
//   </div>
// );

// // Card component for dashboard statistics
// const StatCard = ({ title, value, subValue, icon, color, isLoading, emptyState }) => {
//   if (isLoading) {
//     return (
//       <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-xl h-52 flex items-center justify-center">
//         <ClipLoader color="#ffffff" size={30} />
//       </div>
//     );
//   }

//   if (!value && emptyState) {
//     return (
//       <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl h-52 overflow-hidden">
//         {emptyState}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-xl h-52 transition-all duration-300 hover:border-zinc-700">
//       <div className="flex items-center space-x-2">
//         <div className={`h-10 w-10 rounded-lg ${color} flex items-center justify-center`}>
//           {icon}
//         </div>
//         <h3 className="text-zinc-300 font-medium">{title}</h3>
//       </div>
//       <div className="mt-6">
//         <p className="text-4xl font-bold text-white mb-2">{value || 0}</p>
//         <p className="text-sm text-zinc-400">{subValue}</p>
//       </div>
//     </div>
//   );
// };

// // Activity item component
// const ActivityItem = ({ activity }) => (
//   <div className="flex items-start space-x-4 p-4 rounded-lg transition-colors hover:bg-zinc-800/30">
//     <div className={`p-2 rounded-lg ${activity.colorClass} flex-shrink-0`}>
//       {activity.icon}
//     </div>
//     <div className="flex-1">
//       <p className="text-zinc-200 font-medium">{activity.title}</p>
//       <p className="text-zinc-400 text-sm mt-1">{activity.description}</p>
//       <div className="flex items-center space-x-2 mt-2">
//         <span className="text-xs text-zinc-500">{activity.time}</span>
//         {activity.user && (
//           <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-zinc-400">
//             {activity.user}
//           </span>
//         )}
//       </div>
//     </div>
//     {activity.status && (
//       <span className={`text-xs px-2 py-1 rounded-full ${activity.statusClass}`}>
//         {activity.status}
//       </span>
//     )}
//   </div>
// );

// function Dashboard() {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [isDataLoading, setIsDataLoading] = useState(true);
//   const [assessments, setAssessments] = useState(null);
//   const [candidates, setCandidates] = useState(null);
//   const [activities, setActivities] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [greetingTime, setGreetingTime] = useState("");

//   // Set greeting based on time of day
//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreetingTime("morning");
//     else if (hour < 18) setGreetingTime("afternoon");
//     else setGreetingTime("evening");
//   }, []);

//   // Fetch data from MongoDB
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!isSignedIn) return;

//       try {
//         setIsDataLoading(true);

//         // Connect to MongoDB
//         const { db } = await connectToDB();

//         // Fetch assessments data
//         const assessmentsData = await db.collection("assessments")
//           .find({ userId: user.id })
//           .toArray();

//         // Fetch candidates data
//         const candidatesData = await db.collection("candidates")
//           .find({ userId: user.id })
//           .toArray();

//         // Fetch activities data
//         const activitiesData = await db.collection("activities")
//           .find({ userId: user.id })
//           .sort({ timestamp: -1 })
//           .limit(5)
//           .toArray();

//         // Process and set the data
//         if (assessmentsData.length > 0) {
//           const activeCount = assessmentsData.filter(a => a.status === "active").length;
//           const pendingCount = assessmentsData.filter(a => a.status === "pending").length;
//           const completedCount = assessmentsData.filter(a => a.status === "completed").length;

//           setAssessments({
//             active: activeCount,
//             pending: pendingCount,
//             completed: completedCount,
//             completionRate: Math.round((completedCount / assessmentsData.length) * 100)
//           });
//         }

//         if (candidatesData.length > 0) {
//           const inProgressCount = candidatesData.filter(c => c.status === "in_progress").length;

//           setCandidates({
//             total: candidatesData.length,
//             inProgress: inProgressCount,
//             shortlisted: candidatesData.filter(c => c.status === "shortlisted").length
//           });
//         }

//         if (activitiesData.length > 0) {
//           // Format the activities data
//           const formattedActivities = activitiesData.map(activity => ({
//             id: activity._id.toString(),
//             title: activity.title,
//             description: activity.description,
//             time: new Date(activity.timestamp).toLocaleString(),
//             user: activity.userName,
//             status: activity.status,
//             statusClass: getStatusClass(activity.status),
//             colorClass: getActivityColorClass(activity.type),
//             icon: getActivityIcon(activity.type)
//           }));

//           setActivities(formattedActivities);
//         }

//         // Calculate overall stats
//         setStats({
//           completionRate: assessmentsData.length > 0
//             ? Math.round((assessmentsData.filter(a => a.status === "completed").length / assessmentsData.length) * 100)
//             : 0,
//           candidatesProcessed: candidatesData.length,
//           averageScore: assessmentsData.length > 0
//             ? Math.round(assessmentsData.reduce((acc, curr) => acc + (curr.score || 0), 0) / assessmentsData.length)
//             : 0
//         });

//       } catch (error) {
//         console.error("Error fetching data from MongoDB:", error);
//       } finally {
//         setIsDataLoading(false);
//       }
//     };

//     fetchData();
//   }, [isSignedIn, user]);

//   // Helper functions for activity styling
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "completed": return "bg-green-500/20 text-green-400";
//       case "pending": return "bg-yellow-500/20 text-yellow-400";
//       case "failed": return "bg-red-500/20 text-red-400";
//       default: return "bg-blue-500/20 text-blue-400";
//     }
//   };

//   const getActivityColorClass = (type) => {
//     switch (type) {
//       case "assessment": return "bg-purple-500/20 text-purple-400";
//       case "candidate": return "bg-blue-500/20 text-blue-400";
//       case "coding": return "bg-green-500/20 text-green-400";
//       default: return "bg-indigo-500/20 text-indigo-400";
//     }
//   };

//   const getActivityIcon = (type) => {
//     switch (type) {
//       case "assessment": return <MdOutlineAssessment className="w-5 h-5" />;
//       case "candidate": return <BsPeople className="w-5 h-5" />;
//       case "coding": return <RiCodeBoxLine className="w-5 h-5" />;
//       default: return <FiActivity className="w-5 h-5" />;
//     }
//   };

//   // Loading state
//   if (!isLoaded) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-zinc-950">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="w-16 h-16 relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 animate-ping"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
//               <RiDashboardLine className="w-8 h-8 text-white" />
//             </div>
//           </div>
//           <p className="text-zinc-400">Loading AlgoHire Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   // Handle not signed in state
//   if (!isSignedIn) {
//     return null;
//   }

//   const firstName = user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1).toLowerCase();

//   return (
//     <>
//       <div className="min-h-screen bg-zinc-950">
//         {/* Navigation */}
//         <nav className="border-b border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-16">
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
//                     <RiDashboardLine className="w-5 h-5 text-white" />
//                   </div>
//                   <h1 className="text-xl font-bold text-white tracking-tight">
//                     AlgoEvaluator
//                   </h1>
//                 </div>
//                 {isDataLoading && (
//                   <span className="text-xs px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-800/50 text-indigo-300 flex items-center">
//                     <BsDatabase className="w-3 h-3 mr-1 animate-pulse" />
//                     Syncing data...
//                   </span>
//                 )}
//               </div>
//               <div className="flex items-center space-x-6">
//                 <div className="text-sm text-zinc-400">
//                   {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
//                 </div>
//                 <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center ring-2 ring-zinc-800">
//                   <span className="text-white text-sm font-medium">
//                     {firstName?.[0]}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Main content */}
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Header section */}
//           <div className="grid grid-cols-4 lg:grid-cols-12 gap-6">
//             {/* Header Section - Full Width */}
//             <div className="col-span-4 lg:col-span-12 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl p-6 shadow-lg">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                 <div>
//                   <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
//                     <UserGreeting />
//                   </h2>
//                   <p className="text-zinc-400 mt-2">
//                     {isDataLoading
//                       ? "Loading your recruitment analytics..."
//                       : stats
//                         ? `${stats.candidatesProcessed} candidates processed with ${stats.completionRate}% completion rate`
//                         : "Your dashboard is ready. Start building your hiring pipeline."}
//                   </p>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
//                   <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-all rounded-lg text-sm font-medium text-white border border-zinc-700 shadow-lg shadow-zinc-900/20">
//                     Create Assessment
//                   </button>
//                   <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 transition-all rounded-lg text-sm font-medium text-white shadow-lg shadow-indigo-900/30">
//                     Invite Candidates
//                   </button>
//                   <Link href="/resume">
//                     <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 transition-all rounded-lg text-sm font-medium text-white shadow-lg shadow-indigo-900/30">
//                       Create Resume
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Main Stats Section - First Stat spans 2 columns on larger screens */}
//             <div className="col-span-4 lg:col-span-5 row-span-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 shadow-xl">
//               <div className="flex items-start space-x-4">
//                 <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
//                   <MdOutlineAssessment className="w-6 h-6 text-indigo-300" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-white">Active Assessments</h3>
//                   {isDataLoading ? (
//                     <div className="h-12 bg-indigo-500/10 rounded-lg animate-pulse mt-2" />
//                   ) : assessments?.active ? (
//                     <>
//                       <p className="text-3xl font-bold text-white mt-2">{assessments.active}</p>
//                       <p className="text-zinc-400 text-sm mt-1">{assessments.pending} pending reviews</p>
//                     </>
//                   ) : (
//                     <div className="mt-2">
//                       <p className="text-zinc-400">No assessments created yet</p>
//                       <button className="px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 transition-all rounded-lg text-xs font-medium text-indigo-300 mt-2 border border-indigo-500/30">
//                         Create Assessment
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Second Stat Card */}
//             <div className="col-span-4 lg:col-span-3 row-span-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 shadow-xl">
//               <div className="flex items-start space-x-4">
//                 <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
//                   <BsPeople className="w-6 h-6 text-blue-300" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-white">Active Candidates</h3>
//                   {isDataLoading ? (
//                     <div className="h-12 bg-blue-500/10 rounded-lg animate-pulse mt-2" />
//                   ) : candidates?.total ? (
//                     <>
//                       <p className="text-3xl font-bold text-white mt-2">{candidates.total}</p>
//                       <p className="text-zinc-400 text-sm mt-1">{candidates.inProgress} in progress • {candidates.shortlisted} shortlisted</p>
//                     </>
//                   ) : (
//                     <div className="mt-2">
//                       <p className="text-zinc-400">No candidates yet</p>
//                       <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 transition-all rounded-lg text-xs font-medium text-blue-300 mt-2 border border-blue-500/30">
//                         Invite Candidates
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Third Stat Card */}
//             <div className="col-span-4 lg:col-span-4 row-span-1 bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 shadow-xl">
//               <div className="flex items-start space-x-4">
//                 <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center flex-shrink-0 border border-green-500/30">
//                   <RiCodeBoxLine className="w-6 h-6 text-green-300" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-white">Coding Challenges</h3>
//                   {isDataLoading ? (
//                     <div className="h-12 bg-green-500/10 rounded-lg animate-pulse mt-2" />
//                   ) : assessments?.completed ? (
//                     <>
//                       <p className="text-3xl font-bold text-white mt-2">{assessments.completed}</p>
//                       <p className="text-zinc-400 text-sm mt-1">{assessments.completionRate}% completion rate</p>
//                     </>
//                   ) : (
//                     <div className="mt-2">
//                       <p className="text-zinc-400">No challenges created</p>
//                       <button className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 transition-all rounded-lg text-xs font-medium text-green-300 mt-2 border border-green-500/30">
//                         Create Challenge
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Insights Panel - Wide Column */}
//             <div className="col-span-4 lg:col-span-8 row-span-2 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-800/30 rounded-xl shadow-xl overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-start space-x-4">
//                   <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
//                     <MdOutlineLeaderboard className="w-6 h-6 text-indigo-300" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-white mb-2">
//                       Hiring Insights
//                     </h3>
//                     <p className="text-zinc-300 mb-4">
//                       {isDataLoading
//                         ? "Analyzing your recruitment data..."
//                         : stats && candidates
//                           ? `Your top candidates are scoring ${stats.averageScore}% on average. Consider shortlisting the top performers.`
//                           : "Set up your first assessment to start gathering insights."}
//                     </p>

//                     {!isDataLoading && (
//                       <div className="grid grid-cols-3 gap-4 mt-4">
//                         <div className="px-4 py-3 bg-zinc-800/60 backdrop-blur-sm rounded-xl border border-zinc-700/40">
//                           <p className="text-sm text-zinc-400">Average score</p>
//                           <p className="text-xl font-semibold text-white">{stats?.averageScore || 0}%</p>
//                         </div>
//                         <div className="px-4 py-3 bg-zinc-800/60 backdrop-blur-sm rounded-xl border border-zinc-700/40">
//                           <p className="text-sm text-zinc-400">Completion rate</p>
//                           <p className="text-xl font-semibold text-white">{stats?.completionRate || 0}%</p>
//                         </div>
//                         <div className="px-4 py-3 bg-zinc-800/60 backdrop-blur-sm rounded-xl border border-zinc-700/40">
//                           <p className="text-sm text-zinc-400">Time to complete</p>
//                           <p className="text-xl font-semibold text-white">42 min</p>
//                         </div>
//                       </div>
//                     )}

//                     <div className="mt-6 pt-6 border-t border-indigo-800/30">
//                       <h4 className="text-lg font-medium text-white mb-3">Recommended Actions</h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         <div className="flex items-center gap-3 px-3 py-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
//                           <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
//                             <BsPeople className="w-4 h-4 text-indigo-300" />
//                           </div>
//                           <span className="text-sm text-zinc-300">Review 3 pending applications</span>
//                         </div>
//                         <div className="flex items-center gap-3 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
//                           <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center">
//                             <RiCodeBoxLine className="w-4 h-4 text-green-300" />
//                           </div>
//                           <span className="text-sm text-zinc-300">Create new JavaScript challenge</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Activity Feed - Tall Column */}
//             <div className="col-span-4 lg:col-span-4 row-span-2 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-xl shadow-xl overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold text-white">Recent Activities</h2>
//                   {activities && activities.length > 0 && (
//                     <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
//                       View all
//                     </button>
//                   )}
//                 </div>

//                 {isDataLoading ? (
//                   <div className="space-y-4">
//                     {[1, 2, 3].map((item) => (
//                       <div
//                         key={item}
//                         className="h-16 bg-zinc-800/70 rounded-xl animate-pulse"
//                       />
//                     ))}
//                   </div>
//                 ) : activities && activities.length > 0 ? (
//                   <div className="divide-y divide-zinc-800/50">
//                     {activities.map((activity) => (
//                       <ActivityItem key={activity.id} activity={activity} />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="py-12 flex flex-col items-center justify-center">
//                     <div className="p-4 bg-zinc-800/40 rounded-full mb-4 border border-zinc-700/30">
//                       <FiAlertCircle className="w-8 h-8 text-zinc-400" />
//                     </div>
//                     <h3 className="text-lg font-medium text-white mb-2">No Recent Activities</h3>
//                     <p className="text-zinc-400 text-center max-w-md mb-4">
//                       Start creating assessments and inviting candidates to see your recruitment activities here.
//                     </p>
//                     <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 transition-all rounded-lg text-sm font-medium text-white shadow-lg shadow-indigo-900/30">
//                       Get Started
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Calendar Preview - Full Width Bottom */}
//             <div className="col-span-4 lg:col-span-12 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl p-6 shadow-lg">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-semibold text-white">Upcoming Interviews</h3>
//                 <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
//                   View Calendar
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {isDataLoading ? (
//                   [...Array(5)].map((_, i) => (
//                     <div key={i} className="h-24 bg-zinc-800/50 rounded-xl animate-pulse"></div>
//                   ))
//                 ) : (
//                   <>
//                     <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/30 p-3">
//                       <div className="flex justify-between items-start mb-2">
//                         <div className="bg-indigo-500/20 text-indigo-300 text-xs font-medium px-2 py-1 rounded">Today</div>
//                         <span className="text-zinc-400 text-xs">10:30 AM</span>
//                       </div>
//                       <p className="text-white font-medium">Sarah Chen</p>
//                       <p className="text-zinc-400 text-sm">Frontend Developer</p>
//                     </div>
//                     <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/30 p-3 opacity-60">
//                       <div className="flex justify-between items-start mb-2">
//                         <div className="bg-green-500/20 text-green-300 text-xs font-medium px-2 py-1 rounded">Tomorrow</div>
//                         <span className="text-zinc-400 text-xs">2:00 PM</span>
//                       </div>
//                       <p className="text-white font-medium">Alex Johnson</p>
//                       <p className="text-zinc-400 text-sm">UX Designer</p>
//                     </div>
//                     <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/30 p-3 opacity-60">
//                       <div className="flex justify-between items-start mb-2">
//                         <div className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2 py-1 rounded">Apr 4</div>
//                         <span className="text-zinc-400 text-xs">11:15 AM</span>
//                       </div>
//                       <p className="text-white font-medium">Michael Brown</p>
//                       <p className="text-zinc-400 text-sm">Backend Engineer</p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//       <FooterSection />
//     </>
//   )
// };

// export default Dashboard;


"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { ClipLoader } from "react-spinners";
import {
  Activity,
  AlertCircle,
  BarChart2,
  Code2,
  Users,
  Database,
  Calendar,
  CheckCircle,
  Clock,
  Award,
  FileText,
  User,
  ArrowRight,
  ChevronRight,
  PlusCircle
} from "lucide-react";
import { connectToDB } from "@/lib/mongodb";
import { FooterSection } from "../components/footer/FooterSection";
import UserGreeting from "../components/UserGreeting";
import Link from "next/link";

// Empty state component with improved UI
const EmptyStateCard = ({ title, message, icon, actionText = "Get Started" }) => (
  <div className="flex flex-col items-center justify-center h-full py-8 text-center">
    <div className="p-4 bg-slate-800/40 rounded-full mb-4 border border-slate-700/40">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm max-w-xs mb-4">{message}</p>
    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-sm font-medium text-white shadow-md shadow-blue-900/20">
      {actionText}
    </button>
  </div>
);

// Redesigned stat card with improved visual hierarchy
const StatCard = ({ title, value, subValue, icon, color, isLoading, emptyState }) => {
  if (isLoading) {
    return (
      <div className="bg-slate-900/70 border border-slate-800/80 p-6 rounded-xl h-52 flex items-center justify-center shadow-lg">
        <ClipLoader color="#ffffff" size={30} />
      </div>
    );
  }

  if (!value && emptyState) {
    return (
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl h-52 overflow-hidden shadow-lg">
        {emptyState}
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 border border-slate-800/80 p-6 rounded-xl h-52 transition-all duration-300 hover:border-slate-700 shadow-lg group">
      <div className="flex items-center space-x-3">
        <div className={`h-10 w-10 rounded-lg ${color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-slate-300 font-medium">{title}</h3>
      </div>
      <div className="mt-6">
        <p className="text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{value || 0}</p>
        <p className="text-sm text-slate-400">{subValue}</p>
      </div>
    </div>
  );
};

// Enhanced activity item with better spacing and visual cues
const ActivityItem = ({ activity }) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg transition-colors hover:bg-slate-800/30 border border-transparent hover:border-slate-700/50">
    <div className={`p-2 rounded-lg ${activity.colorClass} flex-shrink-0`}>
      {activity.icon}
    </div>
    <div className="flex-1">
      <p className="text-slate-200 font-medium">{activity.title}</p>
      <p className="text-slate-400 text-sm mt-1">{activity.description}</p>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-xs text-slate-500">{activity.time}</span>
        {activity.user && (
          <span className="text-xs px-2 py-1 bg-slate-800 rounded-full text-slate-400">
            {activity.user}
          </span>
        )}
      </div>
    </div>
    {activity.status && (
      <span className={`text-xs px-2 py-1 rounded-full ${activity.statusClass}`}>
        {activity.status}
      </span>
    )}
  </div>
);

function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [assessments, setAssessments] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [activities, setActivities] = useState(null);
  const [stats, setStats] = useState(null);
  const [greetingTime, setGreetingTime] = useState("");

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreetingTime("morning");
    else if (hour < 18) setGreetingTime("afternoon");
    else setGreetingTime("evening");
  }, []);

  // Fetch data from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) return;

      try {
        setIsDataLoading(true);

        // Connect to MongoDB
        const { db } = await connectToDB();

        // Fetch assessments data
        const assessmentsData = await db.collection("assessments")
          .find({ userId: user.id })
          .toArray();

        // Fetch candidates data
        const candidatesData = await db.collection("candidates")
          .find({ userId: user.id })
          .toArray();

        // Fetch activities data
        const activitiesData = await db.collection("activities")
          .find({ userId: user.id })
          .sort({ timestamp: -1 })
          .limit(5)
          .toArray();

        // Process and set the data
        if (assessmentsData.length > 0) {
          const activeCount = assessmentsData.filter(a => a.status === "active").length;
          const pendingCount = assessmentsData.filter(a => a.status === "pending").length;
          const completedCount = assessmentsData.filter(a => a.status === "completed").length;

          setAssessments({
            active: activeCount,
            pending: pendingCount,
            completed: completedCount,
            completionRate: Math.round((completedCount / assessmentsData.length) * 100)
          });
        }

        if (candidatesData.length > 0) {
          const inProgressCount = candidatesData.filter(c => c.status === "in_progress").length;

          setCandidates({
            total: candidatesData.length,
            inProgress: inProgressCount,
            shortlisted: candidatesData.filter(c => c.status === "shortlisted").length
          });
        }

        if (activitiesData.length > 0) {
          // Format the activities data
          const formattedActivities = activitiesData.map(activity => ({
            id: activity._id.toString(),
            title: activity.title,
            description: activity.description,
            time: new Date(activity.timestamp).toLocaleString(),
            user: activity.userName,
            status: activity.status,
            statusClass: getStatusClass(activity.status),
            colorClass: getActivityColorClass(activity.type),
            icon: getActivityIcon(activity.type)
          }));

          setActivities(formattedActivities);
        }

        // Calculate overall stats
        setStats({
          completionRate: assessmentsData.length > 0
            ? Math.round((assessmentsData.filter(a => a.status === "completed").length / assessmentsData.length) * 100)
            : 0,
          candidatesProcessed: candidatesData.length,
          averageScore: assessmentsData.length > 0
            ? Math.round(assessmentsData.reduce((acc, curr) => acc + (curr.score || 0), 0) / assessmentsData.length)
            : 0
        });

      } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, [isSignedIn, user]);

  // Helper functions for activity styling with enhanced colors
  const getStatusClass = (status) => {
    switch (status) {
      case "completed": return "bg-emerald-500/20 text-emerald-400";
      case "pending": return "bg-amber-500/20 text-amber-400";
      case "failed": return "bg-rose-500/20 text-rose-400";
      default: return "bg-blue-500/20 text-blue-400";
    }
  };

  const getActivityColorClass = (type) => {
    switch (type) {
      case "assessment": return "bg-violet-500/20 text-violet-400";
      case "candidate": return "bg-blue-500/20 text-blue-400";
      case "coding": return "bg-emerald-500/20 text-emerald-400";
      default: return "bg-blue-500/20 text-blue-400";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "assessment": return <FileText className="w-5 h-5" />;
      case "candidate": return <Users className="w-5 h-5" />;
      case "coding": return <Code2 className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  // Improved loading state with subtle animation
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <BarChart2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-slate-400">Loading AlgoEvaluator Dashboard...</p>
        </div>
      </div>
    );
  }

  // Handle not signed in state
  if (!isSignedIn) {
    return null;
  }

  const firstName = user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1).toLowerCase();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
        {/* Navigation - Redesigned with better visual hierarchy */}
        <nav className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <BarChart2 className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-white tracking-tight">
                    AlgoEvaluator
                  </h1>
                </div>
                {isDataLoading && (
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-900/40 border border-blue-800/50 text-blue-300 flex items-center">
                    <Database className="w-3 h-3 mr-1 animate-pulse" />
                    Syncing data...
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-sm text-slate-400">
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
                <div className="relative group">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center ring-2 ring-slate-800 group-hover:ring-blue-500 transition-all cursor-pointer">
                    <span className="text-white text-sm font-medium">
                      {firstName?.[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content with improved layout and spacing */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header section with subtle glow effect */}
          <div className="grid grid-cols-4 lg:grid-cols-12 gap-6">
            {/* Header Section - Full Width */}
            <div className="col-span-4 lg:col-span-12 bg-slate-900/70 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 shadow-xl relative overflow-hidden">
              {/* Abstract background pattern */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -left-10 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
                <div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    <UserGreeting />
                  </h2>
                  <p className="text-slate-400 mt-2">
                    {isDataLoading
                      ? "Loading your recruitment analytics..."
                      : stats
                        ? `${stats.candidatesProcessed} candidates processed with ${stats.completionRate}% completion rate`
                        : "Your dashboard is ready. Start building your hiring pipeline."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 transition-all rounded-lg text-sm font-medium text-white border border-slate-700 shadow-lg">
                    Create Assessment
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all rounded-lg text-sm font-medium text-white shadow-lg flex items-center">
                    <PlusCircle className="w-4 h-4 mr-1.5" />
                    Invite Candidates
                  </button>
                  <Link href="/resume">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all rounded-lg text-sm font-medium text-white shadow-lg">
                      Create Resume
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Stats Section - First Stat spans 2 columns on larger screens */}
            <div className="col-span-4 lg:col-span-5 row-span-1 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>

              <div className="flex items-start space-x-4 relative z-10">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-indigo-500/30 flex items-center justify-center flex-shrink-0 border border-blue-500/30 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-blue-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Active Assessments</h3>
                  {isDataLoading ? (
                    <div className="h-12 bg-blue-500/10 rounded-lg animate-pulse mt-2" />
                  ) : assessments?.active ? (
                    <>
                      <p className="text-3xl font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">{assessments.active}</p>
                      <p className="text-slate-400 text-sm mt-1">{assessments.pending} pending reviews</p>
                    </>
                  ) : (
                    <div className="mt-2">
                      <p className="text-slate-400">No assessments created yet</p>
                      <button className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 transition-all rounded-lg text-xs font-medium text-blue-300 mt-2 border border-blue-500/30 flex items-center">
                        <PlusCircle className="w-3 h-3 mr-1" />
                        Create Assessment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Second Stat Card */}
            <div className="col-span-4 lg:col-span-3 row-span-1 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/30 transition-all">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors"></div>

              <div className="flex items-start space-x-4 relative z-10">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500/30 to-violet-500/30 flex items-center justify-center flex-shrink-0 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-indigo-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Active Candidates</h3>
                  {isDataLoading ? (
                    <div className="h-12 bg-indigo-500/10 rounded-lg animate-pulse mt-2" />
                  ) : candidates?.total ? (
                    <>
                      <p className="text-3xl font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors">{candidates.total}</p>
                      <p className="text-slate-400 text-sm mt-1">{candidates.inProgress} in progress • {candidates.shortlisted} shortlisted</p>
                    </>
                  ) : (
                    <div className="mt-2">
                      <p className="text-slate-400">No candidates yet</p>
                      <button className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 transition-all rounded-lg text-xs font-medium text-indigo-300 mt-2 border border-indigo-500/30 flex items-center">
                        <PlusCircle className="w-3 h-3 mr-1" />
                        Invite Candidates
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Third Stat Card */}
            <div className="col-span-4 lg:col-span-4 row-span-1 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>

              <div className="flex items-start space-x-4 relative z-10">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500/30 to-teal-500/30 flex items-center justify-center flex-shrink-0 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Coding Challenges</h3>
                  {isDataLoading ? (
                    <div className="h-12 bg-emerald-500/10 rounded-lg animate-pulse mt-2" />
                  ) : assessments?.completed ? (
                    <>
                      <p className="text-3xl font-bold text-white mt-2 group-hover:text-emerald-400 transition-colors">{assessments.completed}</p>
                      <p className="text-slate-400 text-sm mt-1">{assessments.completionRate}% completion rate</p>
                    </>
                  ) : (
                    <div className="mt-2">
                      <p className="text-slate-400">No challenges created</p>
                      <button className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 transition-all rounded-lg text-xs font-medium text-emerald-300 mt-2 border border-emerald-500/30 flex items-center">
                        <PlusCircle className="w-3 h-3 mr-1" />
                        Create Challenge
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Insights Panel - Wide Column */}
            <div className="col-span-4 lg:col-span-8 row-span-2 bg-gradient-to-br from-slate-900/90 to-slate-900/60 backdrop-blur-sm border border-slate-800/50 rounded-xl shadow-xl overflow-hidden relative">
              {/* Abstract background pattern */}
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
              <div className="absolute right-20 top-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl"></div>

              <div className="p-6 relative z-10">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                    <BarChart2 className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Hiring Insights
                    </h3>
                    <p className="text-slate-300 mb-4">
                      {isDataLoading
                        ? "Analyzing your recruitment data..."
                        : stats && candidates
                          ? `Your top candidates are scoring ${stats.averageScore}% on average. Consider shortlisting the top performers.`
                          : "Set up your first assessment to start gathering insights."}
                    </p>

                    {!isDataLoading && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="px-4 py-3 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/40 group hover:border-blue-500/20 transition-all">
                          <p className="text-sm text-slate-400">Average score</p>
                          <p className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{stats?.averageScore || 0}%</p>
                        </div>
                        <div className="px-4 py-3 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/40 group hover:border-blue-500/20 transition-all">
                          <p className="text-sm text-slate-400">Completion rate</p>
                          <p className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{stats?.completionRate || 0}%</p>
                        </div>
                        <div className="px-4 py-3 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/40 group hover:border-blue-500/20 transition-all">
                          <p className="text-sm text-slate-400">Time to complete</p>
                          <p className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">42 min</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-slate-800/50">
                      <h4 className="text-lg font-medium text-white mb-3">Recommended Actions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 px-4 py-3 bg-blue-500/5 rounded-lg border border-blue-500/10 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all group cursor-pointer">
                          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                            <Users className="w-4 h-4 text-blue-300" />
                          </div>
                          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Review 3 pending applications</span>
                          <ChevronRight className="w-4 h-4 text-slate-500 ml-auto group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all group cursor-pointer">
                          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                            <Code2 className="w-4 h-4 text-emerald-300" />
                          </div>
                          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Create new JavaScript challenge</span>
                          <ChevronRight className="w-4 h-4 text-slate-500 ml-auto group-hover:text-emerald-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed - Tall Column */}
            <div className="col-span-4 lg:col-span-4 row-span-2 bg-slate-900/70 backdrop-blur-sm border border-slate-800/50 rounded-xl shadow-xl overflow-hidden relative">
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl"></div>

              <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white">Recent Activities</h2>
                  </div>
                  {activities && activities.length > 0 && (
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium flex items-center">
                      View all
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>

                {isDataLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-16 bg-slate-800/70 rounded-xl animate-pulse"
                      />
                    ))}
                  </div>
                ) : activities && activities.length > 0 ? (
                  <div className="divide-y divide-slate-800/50">
                    {activities.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center h-64">
                    <div className="p-4 bg-slate-800/40 rounded-full mb-4 border border-slate-700/40">
                      <Activity className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No Recent Activity</h3>
                    <p className="text-slate-400 text-sm max-w-xs mb-4">Start creating assessments and inviting candidates to see activity here.</p>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-sm font-medium text-white shadow-md shadow-indigo-900/20">
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="col-span-4 lg:col-span-12 bg-slate-900/70 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/assessments">
                  <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/40 p-4 hover:border-blue-500/30 transition-all cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <FileText className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-slate-300 group-hover:text-white transition-colors">Assessments</span>
                    </div>
                  </div>
                </Link>
                <Link href="/candidates">
                  <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/40 p-4 hover:border-indigo-500/30 transition-all cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                        <Users className="w-5 h-5 text-indigo-400" />
                      </div>
                      <span className="text-slate-300 group-hover:text-white transition-colors">Candidates</span>
                    </div>
                  </div>
                </Link>
                <Link href="/challenges">
                  <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/40 p-4 hover:border-emerald-500/30 transition-all cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <Code2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="text-slate-300 group-hover:text-white transition-colors">Challenges</span>
                    </div>
                  </div>
                </Link>
                <Link href="/analytics">
                  <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/40 p-4 hover:border-violet-500/30 transition-all cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                        <BarChart2 className="w-5 h-5 text-violet-400" />
                      </div>
                      <span className="text-slate-300 group-hover:text-white transition-colors">Analytics</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <FooterSection />
      </div>
    </>
  );
}

export default Dashboard;