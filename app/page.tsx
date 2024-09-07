import Hero from "@/components/hero";
import LandingPage from "./LandingPage";
import TechStacks from "./TechStacks";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Chatbot from "@/components/Chatbot";
// import Card from "@/components/Card";

export default async function Index() {
  return (
    <>
      <Hero />
      <LandingPage />
      <TechStacks />
      <Chatbot />
      {/* <Card /> */}
      {/* #TODO add mode data about project on homepage */}
      {/* <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
      </main> */}
    </>
  );
}
