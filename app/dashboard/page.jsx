"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import ClipLoader from "react-spinners/ClipLoader";

function Page() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#2563EB" size={50} />
      </div>
    );
  }

  const firstName =
    user?.firstName?.charAt(0).toUpperCase() +
    user?.firstName?.slice(1).toLowerCase();

  if (!isSignedIn) {
    return;
  }

  return (
    <div>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome, {firstName}!
        </h1>
        <div className="inline-block bg-blue-100 text-blue-700 p-4 rounded-lg shadow-md">
          <p className="text-sm font-medium">
            <span className="font-bold">Important:</span> Please wait while we
            prepare your experience. This may take some time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
