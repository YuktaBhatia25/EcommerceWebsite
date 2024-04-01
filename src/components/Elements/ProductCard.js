import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cartSlice";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { cartList } = useSelector(state => state.cart);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const productInCart = cartList.find(item => item.id === product.id);
    if(productInCart) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cartList, product.id]);

    let costPrice =  product.discount_price ? 
    (
    <div>
        <span className="text-3xl font-bold text-gray-900 dark:text-white mr-2">
            ${ product.discount_price } 
        </span>
        <span className="text-xl font-bold text-gray-500 dark:text-slate-400" style={{textDecoration : 'line-through' }}>
            ${ product.price } 
        </span>
    </div>
    ) : (
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
        ${ product.price } 
        </span>
    )
  return (
    <div className="m-2 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to="#">
        <img
          className="p-8 rounded-t-lg"
          src={ product.poster }
          alt={ product.name }
        />
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/products/${product.id}`}>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            { product.name }
          </h5>
        </Link>
        <Rating rating={product.rating}/>
        <div className="flex items-center justify-between">
            {costPrice}
          <Link
            to="#"
          >
            { 
              ! inCart && <button
                onClick={ () => dispatch(addToCart({product})) }
                type="submit"
                className="hover:cursor-pointer text-white bg-primary-700 hover:bg-primary-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Add To Cart
              </button> 
            }
            { 
              inCart && <button
                onClick={() => dispatch(removeFromCart({product}))}
                type="submit"
                className="hover:cursor-pointer text-white bg-red-700 hover:bg-red-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Remove From Cart
              </button> 
            }

          </Link>
        </div>
      </div>
    </div>
  );
};
