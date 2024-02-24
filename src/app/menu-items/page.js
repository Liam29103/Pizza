"use client";
import {UserProfile} from "@/components/UserProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = UserProfile();

    useEffect(() => {
        fetch("/api/menu-items").then((res) => {
            res.json().then((menuItems) => {
                setMenuItems(menuItems);
            });
        });
    }, []);

    if (loading) return "Loading user info";

    if (!data.admin) return "Not an admin";
    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link className="button flex" href={"/menu-items/new"}>
                    Create new menu items <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-4">Edit menu items</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 &&
                        menuItems.map((item) => (
                            <>
                                <Link href={"/menu-items/edit/" + item._id} className="bg-gray-200 rounded-lg p-4">
                                    <div className="relative">
                                        <Image className="rounded-full" src={item.image} atl={""} width={200} height={200}></Image>
                                    </div>
                                    <div className="text-center">{item.name}</div>
                                </Link>
                            </>
                        ))}
                </div>
            </div>
        </section>
    );
}
