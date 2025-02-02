import React from "react";
import Navbar from "../Navbar";

function Documentation({ children }) {
    return (
        <div>
            <div>
                <Navbar />
                {children}
            </div>
        </div>
    );
}

export default Documentation;
