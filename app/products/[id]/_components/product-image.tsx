'use client';

import { Button } from '@/app/_components/ui/button';
import { Product } from '@prisma/client';
import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductImageProps {
  product: Pick<Product, 'name' | 'imageUrl'>;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative w-full h-[360px] md:min-h-[500px]  md:min-w-[500px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
