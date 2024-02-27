"use client";
import {CartContext, cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import {useContext} from "react";

export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext);

    let total = 0;

    for (const p of cartProducts) {
        total += cartProductPrice(p);
    }

    return (
        <section className="mt-8">
            <div className=" text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>

            <div className=" grid gap-4 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && <div>No products in your shopping cart</div>}
                    {cartProducts?.length > 0 &&
                        cartProducts.map((product, index) => (
                            <>
                                <div className="flex gap-4 mb-4 border-b py-4 items-center">
                                    <div className="w-24">
                                        <Image width={240} height={240} src={product.image} atl={""} />
                                    </div>
                                    <div className="grow">
                                        <h3 className=" font-semibold">{product.name}</h3>
                                        {product.size && (
                                            <div className="text-sm text-gray-700">
                                                Size: <span>{product.size.name}</span>
                                            </div>
                                        )}
                                        {product.extras?.length > 0 && (
                                            <div className="text-sm text-gray-500">
                                                {product.extras.map((extra) => (
                                                    <>
                                                        <div>
                                                            {extra.name} ${extra.price}
                                                        </div>
                                                    </>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
                                    <div className="ml-2">
                                        <button type="button" onClick={() => removeCartProduct(index)} className="p-2">
                                            <Trash />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                    <div className="py-4 text-right pr-16">
                        Total: <span className="text-lg font-semibold">${total}</span>
                    </div>
                </div>
                <div>Right</div>
            </div>
        </section>
    );
}
