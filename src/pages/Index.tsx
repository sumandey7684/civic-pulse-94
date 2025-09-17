import { useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Hero } from "@/components/Home/Hero";
import { FeatureCards } from "@/components/Home/FeatureCards";
import { Stats } from "@/components/Home/Stats";
import { CTA } from "@/components/Home/CTA";

const Index = () => {
  useEffect(() => {
    const v = document.createElement('script');
    v.type = 'text/javascript';
    v.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    v.onload = function() {
      window.voiceflow?.chat?.load?.({
        verify: { projectID: '68cac8dcd4b73f0bb0898a68' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: { url: 'https://runtime-api.voiceflow.com' }
      });
    };
    document.body.appendChild(v);
    return () => {
      document.body.removeChild(v);
    };
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeatureCards />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
