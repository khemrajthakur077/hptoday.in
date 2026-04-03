import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vpyjwoprsncmgxkdiqij.supabase.co'
const supabaseAnonKey = 'sb_publishable_KcC3MV5XJpEzCk9wdP0KLQ_CRMiUWQM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)