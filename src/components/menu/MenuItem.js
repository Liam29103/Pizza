import {useContext, useState} from "react";
import {CartContext} from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem) {
    const {image, name, description, basePrice, sizes, extraIngredientPrices} = menuItem;
    const {addToCart} = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);

    async function handleAddToCartButtonClick() {
        if (sizes.length === 0 && extraIngredientPrices.length === 0) {
            addToCart(menuItem);
            toast.success("Added to cart");
        } else {
            setShowPopup(true);
        }
    }

    return (
        <>
            {showPopup && (
                <div className="fixed  inset-0 bg-black/80 flex items-center justify-center">
                    <div className="my-8 bg-white p-2 rounded-lg max-w-md ">
                        <div className="overflow-y-scroll p-2" style={{maxHeight: "calc(100vh - 100px)"}}>
                            <Image src={image} width={300} height={200} alt={name} className="mx-auto" />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm md-2">{description}</p>
                            {sizes.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-gray-900 text-center">Pick your size</h3>
                                    {sizes.map((size) => (
                                        <>
                                            <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                                <input type="radio" name="size" />
                                                {size.name} ${basePrice + size.price}
                                            </label>
                                        </>
                                    ))}
                                </div>
                            )}
                            {extraIngredientPrices?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-gray-900 text-center">Pick your size</h3>
                                    {extraIngredientPrices.map((extraThing) => (
                                        <>
                                            <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                                <input type="checkbox" name={extraThing.name} />
                                                {extraThing.name} +${extraThing.price}
                                            </label>
                                        </>
                                    ))}
                                </div>
                            )}
                            <button className="bg-primary text-white border-primary" type="button">
                                Add to cart "selected price"
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    );
}
