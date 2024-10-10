// lib/questions.ts

import { supabase } from './supabase'

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export async function fetchQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('id')

  if (error) {
    console.error('Error fetching questions:', error)
    return []
  }

  return data.map(q => ({
    ...q,
    options: q.options as string[]
  }))
}