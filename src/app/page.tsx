import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Hero } from "@/components/Hero";
import { Layout } from "@/components/Layout";
import { Pricing } from "@/components/Pricing";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { Reviews } from "@/components/Reviews";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";

export default function Home() {
  return (
    <div className="h-full  overflow-auto bg-white">
      <Layout>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Faqs />
      </Layout>
    </div>
  );
}
