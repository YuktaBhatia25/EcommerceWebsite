import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { removeFromCart } from "../../../store/cartSlice";

export const CartCard = ({product}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5 ">
      <div className="flex">
      <div>
          <img
            className="w-32 rounded"
            src={product.poster}
            alt={product.name}
          />
        </div>
        <div className="ml-2">
          <Link to={`products/${product.id}`}>
            <p className="text-lg dark:text-slate-200">{product.name}</p>
          </Link>
          <button
            onClick={() => dispatch(removeFromCart({product}))}
            type="button"
            class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Remove
          </button>
        </div>

      </div>
      <div className="text-lg m-2 dark:text-slate-200">
        <span>${product.price}</span>
      </div>
    </div>
  )
}
