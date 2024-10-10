// lib/userResponses.ts

import { supabase } from './supabase'

export interface UserResponse {
  id: string;
  session_id: string;
  responses: Record<number, string>;
  created_at: string;
}

export async function fetchLatestUserResponse(): Promise<UserResponse | null> {
  const { data, error } = await supabase
    .from('user_responses')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching user response:', error)
    return null
  }

  return data
}