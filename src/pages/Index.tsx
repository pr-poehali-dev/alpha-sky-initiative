import { useState } from "react";
import AppShell from "@/components/ios/AppShell";
import HomeScreen from "@/components/ios/HomeScreen";
import ExploreScreen from "@/components/ios/ExploreScreen";
import RoutesScreen from "@/components/ios/RoutesScreen";
import MapScreen from "@/components/ios/MapScreen";
import ProfileScreen from "@/components/ios/ProfileScreen";
import ChatScreen from "@/components/ios/ChatScreen";

type Tab = "home" | "explore" | "routes" | "map" | "profile";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [chatOpen, setChatOpen] = useState(false);

  const renderScreen = () => {
    if (chatOpen) return <ChatScreen />;
    switch (activeTab) {
      case "home":     return <HomeScreen onOpenChat={() => setChatOpen(true)} />;
      case "explore":  return <ExploreScreen />;
      case "routes":   return <RoutesScreen />;
      case "map":      return <MapScreen />;
      case "profile":  return <ProfileScreen />;
    }
  };

  const handleTabChange = (tab: Tab) => {
    setChatOpen(false);
    setActiveTab(tab);
  };

  return (
    <AppShell activeTab={chatOpen ? activeTab : activeTab} onTabChange={handleTabChange}>
      {renderScreen()}
    </AppShell>
  );
};

export default Index;
