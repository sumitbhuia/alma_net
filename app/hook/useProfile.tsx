import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface ProfileData {
  id: string;
  display_name: string | null;
  email: string | null;
  course: string | null;
  roll_no: string | null;
  user_id: string | null;
  college_id: string | null;
  passing_year: number | null;
  bio: string | null;
  phone: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  star_rating: number | null;
  created_at: string;
  updated_at: string;
  user_role: string;
}

export default function useProfile() {
  const supabase = createSupabaseBrowser();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error getting user:", error);
        return;
      }

      if (user) {
        setUserId(user.id); // The authenticated user's ID
      }
    };

    getUser();
  }, [supabase]);

  return useQuery<ProfileData | null>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) {
        console.error("No logged-in user found");
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single(); // Ensuring a single row is fetched

      if (error) {
        console.error("Error fetching profile data:", error);
        return null;
      }

      return data as ProfileData; // Type assertion to ProfileData
    },
    enabled: !!userId, // Only run the query if userId is set
  });
}
