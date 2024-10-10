// components/RacketCard.tsx

import Image from 'next/image'
import Link from 'next/link'

interface RacketCardProps {
  racket: {
    id: number;
    name: string;
    brand: string;
    weight: number;
    head_size: number;
    balance: string;
    image_url: string;
  }
}

export default function RacketCard({ racket }: RacketCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image 
        src={racket.image_url || '/placeholder-racket.jpg'} 
        alt={racket.name}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{racket.name}</h2>
        <p className="text-gray-600 mb-2">{racket.brand}</p>
        <ul className="text-sm mb-4">
          <li>Weight: {racket.weight}g</li>
          <li>Head Size: {racket.head_size} sq in</li>
          <li>Balance: {racket.balance}</li>
        </ul>
        <Link href={`/racket/${racket.id}`} className="bg-tennis-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block">
          View Details
        </Link>
      </div>
    </div>
  )
}