import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kidanxpremxhtnugtkhf.supabase.co";

const supabaseKey =
    "sb_publishable_PW0Z10vYYdRFbGeC_kadPg_DYYqdq7t";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
