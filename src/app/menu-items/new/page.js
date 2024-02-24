"use client";
import {UserProfile} from "@/components/UserProfile";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import {redirect} from "next/navigation";
import Link from "next/link";
import {useState} from "react";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage() {
    const [redirectToItems, setRedirectToItems] = useState(false);

    const {loading, data} = UserProfile();

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/menu-items", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
            });
            if (response.ok) resolve();
            else reject();
        });
        await toast.promise(savingPromise, {
            loading: "Saving this tasty item...",
            success: "Item saved",
            error: "Error, sorry...",
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect("/menu-items");
    }
    if (loading) {
        return "Loading user info...";
    }
    if (!data.admin) {
        return "Not an admin";
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={"/menu-items"} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    );
}
