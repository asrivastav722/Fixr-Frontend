export default function ProductCard({ product }) {
    return <div className="border rounded-xl p-3">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48  object-cover rounded-inherit" />
                <h2 className="text-gray-700 font-semibold poppins text-base mt-3">{product.name}</h2>
                <p className="text-gray-600 line-clamp-1 text-xs poppins">{product.description}</p>
                <div className="flex flex-row justify-between items-center w-full">
                <p className="text-gray-600">{product.location}</p>
                <p className="text-blue-600 font-bold poppins">${product.price}</p>
        </div>
    </div>
}