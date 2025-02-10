import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import CustomCursor from "./components/CustomCursor";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "AlgoEvaluator",
    description: "Ai Powered Interviews",
};
export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={poppins.className}>
                    {/* <CustomCursor /> */}
                    <Provider>{children}</Provider>
                </body>
            </html>
        </ClerkProvider>
    );
}
