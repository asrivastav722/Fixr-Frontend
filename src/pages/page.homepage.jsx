import ProductCard from "../components/card.product";
import { products } from "../utils/utils";

export default function Homepage() {
  return (
    <div className="barlow bg-white">
      <div className=" text-white bg-blue-500 text-2xl font-bold p-4">Bik-Re</div>
      <div className="p-3 grid grid-cols-2 gap-3 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

