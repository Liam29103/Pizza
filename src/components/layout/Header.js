import Link from "next/link";
export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <nav className="flex items-center gap-6 text-gray-500 font-semibold">
                <Link className="text-primary font-semibold text-3xl" href={"/"}>
                    L PIZZA
                </Link>
                <Link href={"/"}>Home</Link>
                <Link href={""}>Menu</Link>
                <Link href={""}>About</Link>
                <Link href={""}>Contact</Link>
            </nav>
            <nav className=" flex items-center gap-4 text-gray-500 font-semibold">
                <Link href="/login">Login</Link>
                <Link className="bg-primary rounded-full text-white px-7 py-2" href="/register">
                    Register
                </Link>
            </nav>
        </header>
    );
}
