import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vpyjwoprsncmgxkdiqij.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_KcC3MV5XJpEzCk9wdP0KLQ_CRMiUWQM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)