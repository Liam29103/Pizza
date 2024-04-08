import {Roboto} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import SectionHeaders from "@/components/layout/SectionHeaders";
import StoreAddress from "@/components/layout/StoreAddress";
import {AppProvider} from "@/components/AppContext";
import {Toaster} from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                        <footer className="bg-gray-900 text-white py-8 mt-4">
                            <div className="container mx-auto text-center footer-container">
                                <div className="footer-item">
                                    <SectionHeaders subHeader="Visit us" />
                                    <StoreAddress />
                                </div>
                                <div className="footer-item">
                                    <section id="contact">
                                        <SectionHeaders subHeader="Don't hesitate" mainHeader="Contact us" />
                                        <div className="mt-8">
                                            <a className="text-4xl underline text-gray-400" href="tel:+84368305342">
                                                +84368305342
                                            </a>
                                        </div>
                                        {/* Sử dụng Font Awesome để hiển thị biểu tượng Facebook và Instagram */}
                                    </section>
                                </div>
                            </div>
                        </footer>
                    </AppProvider>
                </main>
            </body>
        </html>
    );
}
