'use client';

import { Product } from '@prisma/client';
import { ReactNode, createContext, useState } from 'react';

interface CardProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CardProduct[];
  addProductToCart: (product: Product) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CardProduct[]>([]);

  const addProductToCart = (product: Product) => {
    setProducts((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
