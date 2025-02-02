import React from "react";
import Navbar from "../Navbar";

function Contact({ children }) {
    return (
        <div>
            <div>
               <Navbar />
                {children}
            </div>
        </div>
    );
}

export default Contact;
