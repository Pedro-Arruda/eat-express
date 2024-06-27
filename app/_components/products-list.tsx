import { Prisma } from '@prisma/client';
import { db } from '../_lib/prisma';
import ProductItem from './product-item';

interface ProductListPros {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: { select: { name: true } };
    };
  }>[];
}

const ProductList = ({ products }: ProductListPros) => {
  return (
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
