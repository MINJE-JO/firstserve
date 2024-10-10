// lib/recommendation.ts

import { supabase } from './supabase'
import { UserResponse } from './userResponses'

interface Racket {
  id: number;
  name: string;
  brand: string;
  weight: number;
  head_size: number;
  balance: string;
  string_pattern: string;
  power: number;
  control: number;
  spin: number;
  comfort: number;
  description: string;
  image_url: string;
}

export async function recommendRackets(userResponse: UserResponse): Promise<Racket[]> {
  const { data: rackets, error } = await supabase
    .from('rackets')
    .select('*')

  if (error) {
    console.error('Error fetching rackets:', error)
    return []
  }

  const scoredRackets = rackets.map(racket => ({
    ...racket,
    score: calculateScore(racket, userResponse.responses)
  }))

  scoredRackets.sort((a, b) => b.score - a.score)

  return scoredRackets.slice(0, 3)
}

function calculateScore(racket: Racket, responses: Record<number, string>): number {
  let score = 0

  // 이 부분은 실제 질문과 라켓 특성에 맞게 조정해야 합니다
  if (responses[1] === 'Beginner' && racket.power >= 7) score += 2
  if (responses[1] === 'Advanced' && racket.control >= 7) score += 2
  if (responses[2] === 'Baseline' && racket.spin >= 7) score += 2
  if (responses[2] === 'Serve and Volley' && racket.balance === 'Head Light') score += 2
  if (responses[3] === 'Very important' && racket.power >= 8) score += 2
  if (responses[4] === 'High' && racket.control >= 8) score += 2
  if (responses[5] === 'Light (below 300g)' && racket.weight < 300) score += 2
  if (responses[5] === 'Heavy (above 315g)' && racket.weight > 315) score += 2

  return score
}