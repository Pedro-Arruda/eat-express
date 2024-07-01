import Image from 'next/image';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex justify-between pt-6 p-5 container">
      <Link href="/" className="relative h-[30px] w-[100px]">
        <Image src="/logo.png" alt="Logo Food" fill className="object-cover" />
      </Link>
      <Button
        size="icon"
        variant="outline"
        className="bg-transparent border-none md:hidden"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
