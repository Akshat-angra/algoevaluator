import { DM_Sans, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import CustomCursor from "./components/CustomCursor";
import RegisterUser from "./components/RegisterUser";

const josefin = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "AlgoEvaluator",
    description: "AI Powered Interviews",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={josefin.className}>
                    <RegisterUser />
                    {/* <CustomCursor /> */}
                    <Provider>{children}</Provider>
                </body>
            </html>
        </ClerkProvider>
    );
}