import { Product } from '@prisma/client';
import { ArrowDownIcon } from 'lucide-react';

interface DiscountBadgeProps {
  product: Pick<Product, 'discountPercentage'>;
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className="flex items-center gap-[2px] bg-primary py-[2px] px-2 rounded-full text-white">
      <ArrowDownIcon size={12} />
      <span className="font-semibold text-xs">
        {product.discountPercentage}%
      </span>
    </div>
  );
};

export default DiscountBadge;
