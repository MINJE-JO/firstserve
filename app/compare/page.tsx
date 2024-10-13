'use client'

import { useState, useEffect } from 'react'
import { RacketSelector } from '@/components/rackets/RacketSelector'
import { RadarChart } from '@/components/charts/RadarChart'
import { Racket } from '@/types/racket'
import { fetchRackets } from '@/lib/utils/racketUtils'

export default function ComparePage() {
  const [rackets, setRackets] = useState<Racket[]>([])
  const [selectedRackets, setSelectedRackets] = useState<Racket[]>([])

  useEffect(() => {
    async function loadRackets() {
      const fetchedRackets = await fetchRackets()
      setRackets(fetchedRackets)
    }
    loadRackets()
  }, [])

  const handleSelectRacket = (racket: Racket) => {
    if (!selectedRackets.find(r => r.id === racket.id)) {
      setSelectedRackets([...selectedRackets, racket])
    }
  }

  const handleRemoveRacket = (racketId: string) => {
    setSelectedRackets(selectedRackets.filter(r => r.id !== racketId))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">라켓 비교</h1>
      <div className="mb-4">
        <RacketSelector rackets={rackets} onSelect={handleSelectRacket} />
      </div>
      <div className="mb-4">
        {selectedRackets.map(racket => (
          <div key={racket.id} className="inline-block mr-2 mb-2 p-2 bg-gray-100 rounded">
            {racket.brand} {racket.model}
            <button onClick={() => handleRemoveRacket(racket.id)} className="ml-2 text-red-500">X</button>
          </div>
        ))}
      </div>
      {selectedRackets.length > 0 && (
        <RadarChart rackets={selectedRackets} />
      )}
    </div>
  )
}