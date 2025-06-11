import { createClient } from "@/lib/supabase/server";

const getUserID = async (): Promise<string | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user || !data.user.id) {
    return null;
  }

  return data.user.id;
};

export default getUserID;
