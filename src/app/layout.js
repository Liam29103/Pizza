import {Roboto} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import SectionHeaders from "@/components/layout/SectionHeaders";
import StoreAddress from "@/components/layout/StoreAddress";

import {AppProvider} from "@/components/AppContext";
import {Toaster} from "react-hot-toast";

const roboto = Roboto({subsets: ["latin"], weight: ["400", "500", "700"]});

export const metadata = {
    title: "L PIZZA",
};

export default function RootLayout({children}) {
    return (
        <html lang="vn" className="scroll-smooth">
            <body className={roboto.className}>
                <main className="max-w-4xl mx-auto p-4">
                    <AppProvider>
                        <Toaster />

                        <Header />

                        {children}
                        <footer className="bg-gray-900 text-white py-8 mt-auto">
                            <div className="container mx-auto text-center">
                                <SectionHeaders subHeader={"Visit us"} mainHeader={"Our store"} />
                                <StoreAddress />
                                <div className="mt-8">
                                    <a className="text-xl text-gray-400 hover:text-gray-200" href="tel:+84368305342">
                                        +84368305342
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </AppProvider>
                </main>
            </body>
        </html>
    );
}
