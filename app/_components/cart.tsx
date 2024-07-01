import { useContext } from 'react';
import { CartContext } from '../_providers/_contexts/cart';
import CartItem from './cart-item';
import { SheetTitle } from './ui/sheet';
import { Card, CardContent } from './ui/card';
import { formatCurrency } from '../_helpers/price';
import { Separator } from '@radix-ui/react-separator';
import { Button } from './ui/button';

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem cartProduct={product} />
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="p-5 space-y-2">
            <div className="flex justify-between items-center text-xs ">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotalPrice)}</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-xs ">
              <span className="text-muted-foreground">Descontos</span>
              <span>- {formatCurrency(totalDiscounts)}</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-xs ">
              <span className="text-muted-foreground">Entrega</span>
              <span>
                {Number(products[0].restaurant.deliveryFee) === 0 ? (
                  <span className="uppercase text-primary">Grátis</span>
                ) : (
                  formatCurrency(Number(products[0].restaurant.deliveryFee))
                )}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-xs ">
              <span className="text-muted-foreground">Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-6 w-full">Finalizar pedido</Button>
    </div>
  );
};

export default Cart;
