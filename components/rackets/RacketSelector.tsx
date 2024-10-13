'use client'

import { useState } from 'react'
import { Racket } from '@/types/racket'

interface RacketSelectorProps {
  rackets: Racket[]
  onSelect: (racket: Racket) => void
}

export const RacketSelector: React.FC<RacketSelectorProps> = ({ rackets, onSelect }) => {
  const [search, setSearch] = useState('')

  const filteredRackets = rackets.filter(
    racket => racket.brand.toLowerCase().includes(search.toLowerCase()) || 
              racket.model.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="라켓 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <ul className="max-h-60 overflow-y-auto">
        {filteredRackets.map(racket => (
          <li 
            key={racket.id}
            onClick={() => onSelect(racket)}
            className="cursor-pointer hover:bg-gray-100 p-2"
          >
            {racket.brand} {racket.model}
          </li>
        ))}
      </ul>
    </div>
  )
}