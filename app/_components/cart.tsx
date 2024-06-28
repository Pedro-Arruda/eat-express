import { useContext } from 'react';
import { CartContext } from '../_providers/_contexts/card';

const Cart = () => {
  const { products } = useContext(CartContext);
  console.log(products);

  return <div></div>;
};

export default Cart;
