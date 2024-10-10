// app/racket/[id]/page.tsx

import { fetchRacket } from '@/lib/rackets'
import Image from 'next/image'

export default async function RacketDetailPage({ params }: { params: { id: string } }) {
  const racket = await fetchRacket(parseInt(params.id))

  if (!racket) {
    return <div>Racket not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{racket.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={racket.image_url || '/placeholder-racket.jpg'}
            alt={racket.name}
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Specifications</h2>
          <ul className="space-y-2">
            <li><strong>Brand:</strong> {racket.brand}</li>
            <li><strong>Weight:</strong> {racket.weight}g</li>
            <li><strong>Head Size:</strong> {racket.head_size} sq in</li>
            <li><strong>Balance:</strong> {racket.balance}</li>
            <li><strong>String Pattern:</strong> {racket.string_pattern}</li>
            <li><strong>Power:</strong> {racket.power}/10</li>
            <li><strong>Control:</strong> {racket.control}/10</li>
            <li><strong>Spin:</strong> {racket.spin}/10</li>
            <li><strong>Comfort:</strong> {racket.comfort}/10</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2">Description</h2>
          <p>{racket.description}</p>
        </div>
      </div>
    </div>
  )
}