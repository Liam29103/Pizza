"use client";
import {useSession, signOut} from "next-auth/react";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";

export default function Header() {
    const session = useSession();
    const status = session.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    const {cartProducts} = useContext(CartContext);

    if (userName && userName.includes(" ")) {
        userName = userName.split(" ")[0];
    }

    return (
        <header className="flex items-center justify-between">
            <nav className="flex items-center gap-6 text-gray-500 font-semibold">
                <Link className="text-primary font-semibold text-3xl" href={"/"}>
                    L PIZZA
                </Link>
                <Link href={"/"}>Home</Link>
                <Link href={"/menu"}>Menu</Link>
                <Link href={"/#about"}>About</Link>
                <Link href={"/#contact"}>Contact</Link>
            </nav>
            <nav className=" flex items-center gap-4 text-gray-500 font-semibold">
                {status === "authenticated" && (
                    <>
                        <Link href={"/profile"} className="whitespace-nowrap">
                            Hello, {userName}
                        </Link>
                        <button onClick={() => signOut()} className="bg-primary border-primary rounded-full text-white px-7 py-2">
                            LogOut
                        </button>
                    </>
                )}
                {status === "unauthenticated" && (
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/register" className="bg-primary rounded-full text-white px-7 py-2">
                            Register
                        </Link>
                    </>
                )}
                <Link className=" relative" href={"/cart"}>
                    <ShoppingCart />
                    {cartProducts?.length > 0 && (
                        <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">{cartProducts.length}</span>
                    )}
                </Link>
            </nav>
        </header>
    );
}
