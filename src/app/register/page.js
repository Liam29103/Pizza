"use client";
import Image from "next/image";
import {useState} from "react";
import {env, headers} from "../../../next.config";
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);

        const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {"Context-Type": "application/json"},
        });
        if (response.ok) {
            setUserCreated(true);
        } else {
            setError(true);
        }
        setCreatingUser(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created. <br /> Now you can login{" "}
                    <Link className=" underline" href={"/login"}>
                        Login &raquo;
                    </Link>
                </div>
            )}

            <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="Email" value={email} disabled={creatingUser} onChange={(ev) => setEmail(ev.target.value)}></input>

                <input type="password" placeholder="Password" value={password} disabled={creatingUser} onChange={(ev) => setPassword(ev.target.value)}></input>

                {error && <div className="my-4 text-center text-red-500">Something went wrong. Please try again.</div>}
                <button type="submit" disabled={creatingUser}>
                    Register
                </button>

                <div className="my-4 text-gray-500 text-center">or login with provider</div>
                <button className="flex gap-4 justify-center">
                    <Image src={"/google.png"} atl={""} width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center my-4 border-t pt-4 text-gray-500">
                    Existing account?{" "}
                    <Link className=" underline" href={"/login"}>
                        Login here &raquo;
                    </Link>
                </div>
            </form>
        </section>
    );
}
