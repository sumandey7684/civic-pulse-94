
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Hero } from "@/components/Home/Hero";
import { FeatureCards } from "@/components/Home/FeatureCards";
import { Stats } from "@/components/Home/Stats";
import { CTA } from "@/components/Home/CTA";
import Chatbot from "@/components/Home/Chatbot";
import Dashboard from "@/components/Dashboard";


// Dummy user and civicCoins for demo; replace with real auth and coin logic
const user = { name: "Citizen User", email: "citizen@example.com" };
const civicCoins = 42;

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-dark-blue-gradient dark:text-white">
  {/* Dashboard is now only available on the dedicated page after login/signup. */}
      <Header />
      <main>
        <Hero />
        <FeatureCards />
        <Stats />
        <CTA />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
