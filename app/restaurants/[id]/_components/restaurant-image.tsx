'use client';

import { Button } from '@/app/_components/ui/button';
import { Restaurant } from '@prisma/client';
import { ChevronLeftIcon, HeartIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative w-full h-[250px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
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

      <Button
        size="icon"
        className="absolute top-4 right-4 bg-gray-700 rounded-ful"
      >
        <HeartIcon className="h-fit w-fit fill-white" size={20} />
      </Button>
    </div>
  );
};

export default RestaurantImage;
