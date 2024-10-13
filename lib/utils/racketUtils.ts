import { supabase } from '@/lib/supabase/client'
import { Racket } from '@/types/racket'

export async function fetchRackets(): Promise<Racket[]> {
  const { data, error } = await supabase
    .from('rackets')
    .select('*')

  if (error) {
    console.error('Error fetching rackets:', error)
    return []
  }

  return data
}