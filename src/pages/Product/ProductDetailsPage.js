import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDynamicTitle, useFetch } from "../../hooks";
import { Rating } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cartSlice";

export const ProductDetailsPage = () => {
  useDynamicTitle("Product Page | Purity Plants");
  const params = useParams();
  const productId = params.id;
  const BASE_URL = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const [inCart, setInCart] = useState(false);

  const { data: product } = useFetch(`${BASE_URL}products/${productId}`);

  useEffect(() => {
    if (product) {
      const productInCart = cartList.find((item) => item.id === product.id);
      if (productInCart) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
  }, [product, cartList]);

  return (
    <main>
      {product && (
        <section>
          <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-slate-900 dark:text-slate-200">
            {product.name}
          </h1>
          <p className="mb-5 text-lg text-center text-slate-900 dark:text-slate-200">
            {product.overview}
          </p>
          <div className="flex flex-wrap justify-around">
            <div className="max-w-xl my-3">
              <img
                className="rounded"
                src={product.poster}
                alt={product.name}
              />
            </div>
            <div className="max-w-xl my-3">
              <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                <span className="mr-1">$</span>
                <span className="">{product.price}</span>
              </p>
              <p className="my-3">
                <span>
                  <Rating rating={product.rating} />
                </span>
              </p>
              <p className="my-4 select-none">
                {product.best_seller && (
                  <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">
                    BEST SELLER
                  </span>
                )}
                {product.in_stock && (
                  <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                    INSTOCK
                  </span>
                )}
                {!product.in_stock && (
                  <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                    OUT OF STOCK
                  </span>
                )}
                <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                  {product.size} Inches
                </span>
              </p>
              <p className="my-3">
                {/* FIXME: Change color of the button when it is disabled */}
                {!inCart && (
                  <button
                    onClick={() => dispatch(addToCart({ product }))}
                    type="submit"
                    className="hover:cursor-pointer text-white bg-primary-700 hover:bg-primary-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Add To Cart
                  </button>
                )}
                {inCart && (
                  <button
                    onClick={() => dispatch(removeFromCart({ product }))}
                    type="submit"
                    className="hover:cursor-pointer text-white bg-red-700 hover:bg-red-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Remove From Cart
                  </button>
                )}
              </p>
              <p className="text-md text-gray-900 dark:text-slate-200">
                {product.long_description}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
