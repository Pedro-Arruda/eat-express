import Header from '@/app/_components/header';
import RestaurantItem from '@/app/_components/restaurant-item';
import { db } from '@/app/_lib/prisma';

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});
  return (
    <>
      <Header />
      <div className="py-6 px-5">
        <h2 className="text-lg font-semibold mb-6">
          Restaurantes Recomendados
        </h2>
        <div className="flex flex-col gap-6 w-full">
          {restaurants.map((restaunt) => (
            <RestaurantItem
              restaurant={restaunt}
              className="min-w-full max-w-full"
              key={restaunt.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
