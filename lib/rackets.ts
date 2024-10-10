// lib/rackets.ts

import { supabase } from './supabase'

export interface Racket {
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

export async function fetchRacket(id: number): Promise<Racket | null> {
  const { data, error } = await supabase
    .from('rackets')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching racket:', error)
    return null
  }

  return data
}