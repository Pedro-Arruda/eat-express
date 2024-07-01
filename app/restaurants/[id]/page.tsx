import { db } from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';
import RestaurantImage from './_components/restaurant-image';
import Image from 'next/image';
import { StarIcon } from 'lucide-react';
import DeliveryInfo from '@/app/_components/deliveryInfo';
import ProductList from '@/app/_components/products-list';
import CartBanner from './cart-banner';

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          products: {
            where: { restaurantId: id },
            include: { restaurant: true },
          },
        },
      },
      products: {
        take: 10,
        include: { restaurant: { select: { name: true } } },
      },
    },
  });

  if (!restaurant) return notFound();

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div>
        <div className="flex flex-col px-5 pt-5 rounded-t-3xl">
          <div className="flex justify-between">
            <div className="flex items-center gap-[0.375rem]">
              <div className="relative h-8 w-8">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              <h1 className="text-xl font-semibold">{restaurant.name}</h1>
            </div>

            <div className="flex items-center gap-[3px] bg-foreground text-white py-[2px] px-2 rounded-full">
              <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-xs">5.0</span>
            </div>
          </div>

          <div className="px-5">
            <DeliveryInfo restaurant={restaurant} />
          </div>

          <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5 mt-3">
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                className="bg-[#f4f4f4] min-w-[167px] rounded-lg text-center"
              >
                <span className="text-muted-foreground text-xs">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <h2 className="px-5 font-semibold">Mais pedidos</h2>
            <ProductList products={restaurant.products} />
          </div>
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4" key={category.id}>
            <h2 className="px-5 font-semibold">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </div>
  );
};

export default RestaurantPage;
