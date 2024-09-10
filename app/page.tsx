import Hero from "@/components/hero";
import LandingPage from "../components/LandingPage";
import TechStacks from "../components/TechStacks";
import Testimonials from "../components/testimonials";
import Vision from "../components/vision";

export default async function Index() {
  return (
    <div>
      <Hero />
      <Vision />
      <LandingPage />
      <Testimonials />
      <TechStacks />
    </div>
  );
}
