import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://vpyjwoprsncmgxkdiqij.supabase.co';
const supabaseAnonKey = 'sb_publishable_KcC3MV5XJpEzCk9wdP0KLQ_CRMiUWQM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const fetchNews = async () => {
  const { data, error } = await supabase.from('news').select('id,title').limit(20);
  if (error) {
    console.error('ERROR', error);
    return;
  }
  console.log(data);
};

fetchNews();
