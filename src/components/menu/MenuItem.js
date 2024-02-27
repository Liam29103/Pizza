import {useContext, useState} from "react";
import {CartContext} from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem) {
    const {image, name, description, basePrice, sizes, extraIngredientPrices} = menuItem;
    const {addToCart} = useContext(CartContext);

    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    async function handleAddToCartButtonClick() {
        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
        addToCart(menuItem, selectedSize, selectedExtras);

        setShowPopup(false);
        toast.success("Added to cart");
    }

    function handleExtraThingClick(ev, extraThing) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectedExtras((prev) => [...prev, extraThing]);
        } else {
            setSelectedExtras((prev) => {
                return prev.filter((e) => e.name !== extraThing.name);
            });
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    return (
        <>
            {showPopup && (
                <div onClick={() => setShowPopup(false)} className="fixed  inset-0 bg-black/80 flex items-center justify-center">
                    <div onClick={(ev) => ev.stopPropagation()} className="my-8 bg-white p-2 rounded-lg max-w-md ">
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
                                                <input
                                                    onClick={() => setSelectedSize(size)}
                                                    checked={selectedSize?.name === size.name}
                                                    type="radio"
                                                    name="size"
                                                />
                                                {size.name} ${basePrice + size.price}
                                            </label>
                                        </>
                                    ))}
                                </div>
                            )}
                            {extraIngredientPrices?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-gray-900 text-center">Any extras?</h3>

                                    {extraIngredientPrices.map((extraThing) => (
                                        <>
                                            <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                                <input onClick={(ev) => handleExtraThingClick(ev, extraThing)} type="checkbox" name={extraThing.name} />
                                                {extraThing.name} +${extraThing.price}
                                            </label>
                                        </>
                                    ))}
                                </div>
                            )}
                            <button onClick={handleAddToCartButtonClick} className="bg-primary text-white border-primary sticky bottom-2" type="button">
                                Add to cart ${selectedPrice}
                            </button>
                            <button className="mt-2" onClick={() => setShowPopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    );
}
