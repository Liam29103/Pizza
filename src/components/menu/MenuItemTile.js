import AddToCartButton from "./AddToCartButton";

export default function MenuItemTile({onAddToCart, ...item}) {
    const {image, description, name, basePrice, sizes, extraIngredientPrices} = item;
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;

    return (
        <div className=" bg-gray-300 p-4 rounded-lg text-center group hover:bg-white hover:shadow-2xl hover:shadow-black/50 transition-all">
            <div className="text-center">
                <img className="rounded-full max-h-auto max-h-40 block mx-auto" src={image} alt="pizza" />
            </div>
            <h4 className=" font-semibold text-xl my-3">{name}</h4>
            <p className=" text-gray-500 text-sm line-clamp-3">{description}</p>
            <AddToCartButton hasSizesOrExtras={hasSizesOrExtras} onClick={onAddToCart} basePrice={basePrice} image={image} />
        </div>
    );
}
