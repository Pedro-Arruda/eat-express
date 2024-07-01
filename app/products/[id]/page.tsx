import { db } from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';
import ProductImage from './_components/product-image';
import ProductDetails from './_components/products-details';
import ProductList from '@/app/_components/products-list';
import { Button } from '@/app/_components/ui/button';

interface ProductsPageProps {
  params: {
    id: string;
  };
}

const ProductsPage = async ({ params: { id } }: ProductsPageProps) => {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      restaurant: true,
      category: { select: { name: true } },
    },
  });

  if (!product) return notFound();

  const juices = await db.product.findMany({
    where: {
      category: { id: product.categoryId },
      restaurant: { id: product?.restaurant.id },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="md:container">
      <div className="md:flex md:container md:mt-10 md:gap-5">
        <ProductImage product={product} />

        <ProductDetails product={product} complementaryProducts={juices} />
      </div>

      <div>
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold px-5">{product.category.name}</h3>
          <ProductList products={juices} />
        </div>

        <div className="mt-6 px-5">
          <Button
            className="w-full font-semibold"
            // onClick={handleAddToCartClick}
          >
            Adicionar á sacola
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
