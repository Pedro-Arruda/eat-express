'use client';

import { calculateProductTotalPrice } from '@/app/_helpers/price';
import { Prisma, Product } from '@prisma/client';
import { ReactNode, createContext, useMemo, useState } from 'react';

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: { restaurant: { select: { deliveryFee: true } } };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  addProductToCart: (
    product: Prisma.ProductGetPayload<{
      include: { restaurant: { select: { deliveryFee: true } } };
    }>,
    quantity: number
  ) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductsFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  totalPrice: 0,
  subtotalPrice: 0,
  totalDiscounts: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductsFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscounts = subtotalPrice - totalPrice;

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity == 1) return cartProduct;

          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      })
    );
  };

  const increaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      })
    );
  };

  const removeProductsFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  const addProductToCart = (
    product: Prisma.ProductGetPayload<{
      include: { restaurant: { select: { deliveryFee: true } } };
    }>,
    quantity: number
  ) => {
    const hasDifferenceRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId
    );

    if (hasDifferenceRestaurantProduct) setProducts([]);

    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    );

    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }

          return cartProduct;
        })
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        totalPrice,
        subtotalPrice,
        totalDiscounts,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductsFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
