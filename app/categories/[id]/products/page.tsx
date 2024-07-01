import { notFound } from 'next/navigation';
import { db } from '../../../_lib/prisma';
import Header from '@/app/_components/header';
import ProductItem from '@/app/_components/product-item';

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: { id },
    include: { products: { include: { restaurant: true }, take: 15 } },
  });

  if (!category) notFound();

  return (
    <>
      <Header />
      <div className="md:container">
        <div className="py-6 px-5">
          <h2 className="text-lg font-semibold mb-6">{category.name}</h2>
          <div className="grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center">
            {category.products.map((product) => (
              <ProductItem
                product={product}
                className="min-w-full md:min-w-[200px]"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
