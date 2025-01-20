import React from "react";
import Navbar from "./_component/Navbar";

function DashboardLayout({ children }) {
  return (
    <div>
      <div>
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
