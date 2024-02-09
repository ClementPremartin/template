import AddToCart from "./AddToCart";

const ProductCard = () => {
  return (
    <div className="bg-red-600 w-52 flex flex-col rounded-md p-3">
      <h1 className="flex justify-center">Product Card</h1>
      <div className="flex justify-center p-2 bg-slate-50">
        <AddToCart />
      </div>
    </div>
  );
};

export default ProductCard;

