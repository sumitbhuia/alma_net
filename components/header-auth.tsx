import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { LogOut, LogIn, UserPlus } from "lucide-react"; // Make sure to install lucide-react

export default async function AuthButton() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  let firstName = 'Guest';

  if (error) {
    console.error('Error fetching user data:', error.message);
  } else if (user) {
    const fullName = user.user_metadata.displayName || '';
    firstName = fullName.split(' ')[0] || 'User';
  } else {
    console.log('No user logged in');
  }

  return user ? (
    <div className="flex items-center gap-2 sm:gap-4">
      <span className="text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-[150px]">
        Hey, {firstName}!
      </span>
      <form action={signOutAction}>
        {/* <Button type="submit" variant="outline" size="sm" icon={<LogOut className="h-4 w-4" />}> */}
        {/* <Button type="submit" variant="outline" size="sm" >
        <LogOut className="h-4 w-4 sm:hidden" />
          Sign out
        </Button> */}
        <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">
          <LogOut className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Sign out</span>
        </Link>
      </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">
          <LogIn className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Sign in</span>
        </Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/sign-up">
          <UserPlus className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Sign up</span>
        </Link>
      </Button>
    </div>
  );
}