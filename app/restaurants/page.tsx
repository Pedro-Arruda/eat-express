'use client';

import { Restaurant } from '@prisma/client';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchForRestaurant } from './_actions/search';
import RestaurantItem from '../_components/restaurant-item';
import Header from '../_components/header';

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get('search');

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;

      const foundRestaurants = await searchForRestaurant(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchParams]);

  if (!searchFor) return notFound();

  return (
    <>
      <Header />
      <div className="py-6 px-5">
        <h2 className="text-lg font-semibold mb-6">Restaurantes Encontrados</h2>
        <div className="flex flex-col gap-6 w-full">
          {restaurants.map((restaunt) => (
            <RestaurantItem
              restaurant={restaunt}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
