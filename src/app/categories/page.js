"use client";
import DeleteButton from "@/components/DeleteButton";
import {UserProfile} from "@/components/UserProfile";
import UserTabs from "@/components/layout/UserTabs";
import {set} from "mongoose";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {resolve} from "styled-jsx/css";

export default function Categories() {
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const {loading: profileLoading, data: profileData} = UserProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch("/api/categories").then((res) => {
            res.json().then((categories) => {
                setCategories(categories);
            });
        });
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = {name: categoryName};
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch("/api/categories", {
                method: editedCategory ? "PUT" : "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
            setCategoryName("");
            fetchCategories();
            setEditedCategory(null);
            if (response.ok) resolve();
            else reject();
        });
        await toast.promise(creationPromise, {
            loading: editedCategory ? "Updating category..." : "Creating your new category...",
            success: editedCategory ? "Category updated" : "Category created",
            error: "Error, sorry...",
        });
    }

    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/categories?_id=" + _id, {
                method: "DELETE",
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(promise, {
            loading: "Deleting...",
            success: "Deleted",
            error: "Error,sorry!",
        });
        fetchCategories();
    }

    if (profileLoading) {
        return "Loading user info...";
    }

    if (!profileData.admin) {
        return "Not an admin";
    }
    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? "Update category: " : "New categories name"}
                            {editedCategory && (
                                <>
                                    <b>{editedCategory.name}</b>
                                </>
                            )}
                        </label>
                        <input type="text" value={categoryName} onChange={(ev) => setCategoryName(ev.target.value)} />
                    </div>
                    <div className="pb-4 flex gap-2">
                        <button className="border border-primary" type="submit">
                            {editedCategory ? "Update" : "Create"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCategory(null), setCategoryName("");
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing category</h2>
                {categories?.length > 0 &&
                    categories.map((c) => (
                        <>
                            <div className="bg-gray-300 border-none rounded-xl p-2 px-4 flex gap-1  mb-2 items-center">
                                <div className="grow">{c.name}</div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => {
                                            setEditedCategory(c);
                                            setCategoryName(c.name);
                                        }}
                                        type="button">
                                        Edit
                                    </button>

                                    <DeleteButton label="Delete" onDelete={() => handleDeleteClick(c._id)} />
                                </div>
                            </div>
                        </>
                    ))}
            </div>
        </section>
    );
}
