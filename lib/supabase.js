import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ititzlowzreobtjujrix.supabase.co';
const supabaseAnonKey = 'sb_publishable_gYWr85TVCVj9aBTd2QAPOw_budfk0gP';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);