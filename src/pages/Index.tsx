import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Featured from "@/components/Featured";
import RouteGenerator from "@/components/RouteGenerator";
import Reviews from "@/components/Reviews";
import AttractionMap from "@/components/AttractionMap";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";
import ProfileModal from "@/components/ProfileModal";
import ChatAssistant from "@/components/ChatAssistant";

const Index = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Header
        onOpenProfile={() => setProfileOpen(true)}
        onOpenChat={() => setChatOpen(true)}
      />
      <Hero />
      <Services />
      <Featured />
      <RouteGenerator />
      <AttractionMap />
      <Reviews />
      <Promo />
      <Footer />

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      <ChatAssistant open={chatOpen} onClose={() => setChatOpen(false)} />
    </main>
  );
};

export default Index;
