'use client';

import Image from 'next/image';
import { Prisma } from '@prisma/client';
import Cart from '@/app/_components/cart';
import { useContext, useState } from 'react';
import { Button } from '@/app/_components/ui/button';
import ProductList from '@/app/_components/products-list';
import DeliveryInfo from '@/app/_components/deliveryInfo';
import DiscountBadge from '@/app/_components/discount-badge';
import { CartContext } from '@/app/_providers/_contexts/cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import {
  calculateProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog';

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const { addProductToCart, products } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const addToCart = () => {
    addProductToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });

  const handleAddToCartClick = () => {
    const hasDifferenceRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId
    );

    if (hasDifferenceRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart();
  };

  return (
    <>
      <div className="py-5 relative rounded-t-3xl mt-[-1.5rem] z-50 bg-white">
        <div className="flex items-center gap-[0.375rem] px-5">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className="font-semibold text-xl mb-2 mt-1 px-5">{product.name}</h1>

        <div className="flex justify-between px-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>

              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>

            {product.discountPercentage > 0 && (
              <p className="text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size="icon" onClick={handleIncreaseQuantityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className=" px-5">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>

        <div className="mt-6 space-y-3 px-5">
          <h3 className="font-semibold">Sobre</h3>
          <p className="tex-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esse produto? Isso limpará sua sacola
              atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart()}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
