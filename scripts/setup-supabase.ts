import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fflqsgztcbklxjxafgii.supabase.co';
const SUPABASE_KEY = 'sb_publishable_iHAmh_29GrAQ25TY5gAG3Q_h_GwDqO-';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const commonRpcs = ['seed', 'seed_data', 'create_user', 'init', 'get_schema', 'analyze_project'];
  for (const rpc of commonRpcs) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${rpc}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    console.log(`RPC '${rpc}': status ${res.status}`);
  }
}

main();
