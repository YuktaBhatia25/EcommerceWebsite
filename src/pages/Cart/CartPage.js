import { useSelector } from "react-redux";
import { useDynamicTitle } from "../../hooks";
import { CartEmpty } from "./components/CardEmpty";
import { CartList } from "./components/CartList";

export const CartPage = () => {
  const { cartList } = useSelector( state => state.cart );
  useDynamicTitle('My Cart | Purity Plants');

  return (
    <main>       
      { cartList.length ? <CartList /> : <CartEmpty /> }   
    </main>
  )
}
