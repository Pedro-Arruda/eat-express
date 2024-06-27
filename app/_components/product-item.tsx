import { Prisma, Product } from '@prisma/client';
import Image from 'next/image';
import { calculateProductTotalPrice, formatCurrency } from '../_helpers/price';
import { ArrowDownIcon } from 'lucide-react';

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: { select: { name: true } };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="space-y-2 w-[150px] min-w-[150px]">
      <div className="w-full h-[150px] relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover rounded-lg shadow-md"
        />

        {product.discountPercentage && (
          <div className="flex items-center gap-[2px] absolute top-2 left-2 bg-primary py-[2px] px-2 rounded-full text-white">
            <ArrowDownIcon size={12} />
            <span className="font-semibold text-xs">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm truncate">{product.name}</h2>
        <div className="flex gap-1 items-center">
          <h3 className="font-semibold">
            R$
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>

          {product.discountPercentage > 0 && (
            <span className="line-through text-muted-foreground text-xs">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <span className="text-muted-foreground text-xs block">
          {product.restaurant.name}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
