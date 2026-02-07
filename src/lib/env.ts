
export const getSupabaseEnv = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Configuration error: Supabase env missing. Please redeploy with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
  }

  return { url, anonKey };
};

export const checkSupabaseEnv = () => {
  try {
    getSupabaseEnv();
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown configuration error' 
    };
  }
};
