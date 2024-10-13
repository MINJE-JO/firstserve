import Image from 'next/image';
import Link from 'next/link';
import { Racket } from '@/types/racket';

interface RacketCardProps {
  racket: Racket;
}

export default function RacketCard({ racket }: RacketCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image
        src={racket.image_url}
        alt={`${racket.brand} ${racket.model}`}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{racket.brand} {racket.model}</h2>
        <p className="text-gray-600 mb-2">무게: {racket.weight}g</p>
        <p className="text-gray-600 mb-4">밸런스: {racket.balance}mm</p>
        <Link href={`/racket/${racket.id}`} className="text-blue-500 hover:underline">
          상세 정보
        </Link>
      </div>
    </div>
  );
}