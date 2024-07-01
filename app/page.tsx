import Header from './_components/header';
import Search from './_components/search';
import CategoryList from './_components/category-list';
import ProductList from './_components/products-list';
import { Button } from './_components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import { db } from './_lib/prisma';
import PromoBanner from './_components/promo-banner';
import RestaurantList from './_components/restaurant-list';
import Link from 'next/link';
import Image from 'next/image';

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="relative h-[70vh] w-[100%] hidden xl:block">
        <Image
          src="/banner-ofertas.png"
          alt="Banner img"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="container">
        <div className="px-5 pt-6 md:hidden">
          <Search />
        </div>

        <div className="px-5 pt-6">
          <CategoryList />
        </div>

        <div className="px-5 pt-6 flex flex-col gap-5 md:flex-row">
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Ate 30% de desconto em pizzas!"
            // className="hidden md:inline-flex"
          />

          <PromoBanner
            src="/promo-banner-02.png"
            alt="Ate 30% de desconto em pizzas!"
            // className="hidden md:inline-flex"
          />
        </div>

        <div className="pt-6 space-y-4">
          <div className="px-5 flex justify-between items-center">
            <h2 className="font-semibold">Produtos recomendados</h2>
            <Button
              variant="ghost"
              className="text-primary p-0 hover:bg-transparent h-fit"
              asChild
            >
              <Link href="/products/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <ProductList products={products} />
        </div>

        <div className="px-5 pt-6 md:hidden">
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </div>

        <div className="py-6 space-y-4">
          <div className="px-5 flex justify-between items-center">
            <h2 className="font-semibold">Restaurantes recomendados</h2>
            <Button
              variant="ghost"
              className="text-primary p-0 hover:bg-transparent h-fit"
              asChild
            >
              <Link href="/restaurants/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <RestaurantList />
        </div>
      </div>
    </>
  );
};

export default Home;
