"use client";

import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface ProfileData {
  email: string | null;
  user_id: string | null;
  display_name: string | null;
}

export default function useProfile() {
  const supabase = createSupabaseBrowser();

  return useQuery<ProfileData | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("email, user_id, display_name")
        .single();

      if (error) {
        console.error("Error fetching profile data:", error);
        return null;
      }

      return data;
    },
  });
}
