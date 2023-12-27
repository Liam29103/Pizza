export default function MenuItem() {
    return (
        <div className=" bg-gray-300 p-4 rounded-lg text-center group hover:bg-white hover:shadow-2xl hover:shadow-black/50 transition-all">
            <div className="text-center">
                <img className="rounded-full max-h-auto max-h-40 block mx-auto" src="/pizza_haisan.png" alt="pizza" />
            </div>
            <h4 className=" font-semibold text-xl my-3">Seafood Pizza</h4>
            <p className=" text-gray-500 text-sm">Fresh shrimp, crab sticks, squid and broccoli on a base of Green Pesto sauce</p>
            <button className=" bg-primary text-white rounded-full px-8 py-2 mt-4">Add to cart $12</button>
        </div>
    );
}
