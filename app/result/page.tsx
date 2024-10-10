// app/result/page.tsx

import { fetchLatestUserResponse } from '@/lib/userResponses'
import { recommendRackets } from '@/lib/recommendation'
import RacketCard from '@/components/RacketCard'

export default async function ResultPage() {
  const userResponse = await fetchLatestUserResponse()
  
  if (!userResponse) {
    return <div>No recent questionnaire responses found. Please take the questionnaire first.</div>
  }

  const recommendedRackets = await recommendRackets(userResponse)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Recommended Rackets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedRackets.map(racket => (
          <RacketCard key={racket.id} racket={racket} />
        ))}
      </div>
    </div>
  )
}