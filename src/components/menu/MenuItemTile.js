export default function MenuItemTile({onAddToCart, ...item}) {
    const {image, description, name, basePrice} = item;

    return (
        <div className=" bg-gray-300 p-4 rounded-lg text-center group hover:bg-white hover:shadow-2xl hover:shadow-black/50 transition-all">
            <div className="text-center">
                <img className="rounded-full max-h-auto max-h-40 block mx-auto" src={image} alt="pizza" />
            </div>
            <h4 className=" font-semibold text-xl my-3">{name}</h4>
            <p className=" text-gray-500 text-sm line-clamp-3">{description}</p>
            <button type="button" onClick={onAddToCart} className=" bg-primary text-white rounded-full px-8 py-2 mt-4">
                Add to cart ${basePrice}
            </button>
        </div>
    );
}
