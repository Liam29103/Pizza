"use client";

import {CartContext} from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";

export default function OrderPage() {
    const {clearCart} = useContext(CartContext);
    const [order, setOrder] = useState();
    const {id} = useParams();
    useEffect(() => {
        if (typeof window.console !== "undefined") {
            if (window.location.href.includes("clear-cart=1")) {
                clearCart();
            }
        }
        if (id) {
            fetch("/api/orders?_id=" + id).then((res) => {
                res.json().then((orderData) => {
                    setOrder(orderData);
                });
            });
        }
    }, []);

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Your order" />
                <div className="mt-4 mb-8">
                    <p>Thanks for your order.</p>
                    <p>We will call you when your order will be on the way.</p>
                </div>
            </div>
            {order && (
                <div className="grid md:grid-cols-2 md:gap-16">
                    <div>Left</div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <AddressInputs disabled={true} addressProps={...order} />
                    </div>
                </div>
            )}
        </section>
    );
}
