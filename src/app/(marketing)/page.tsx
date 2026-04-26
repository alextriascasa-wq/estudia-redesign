import { Hero } from "@/components/marketing/hero";
import { Problem } from "@/components/marketing/problem";
import { Features } from "@/components/marketing/features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Testimonials } from "@/components/marketing/testimonials";
import { Parents } from "@/components/marketing/parents";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Parents />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
