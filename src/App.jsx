import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import {Footer} from "./components/Footer";
import ArticlesSection from "./components/ArticlesSection";
import { Toaster } from "@/components/ui/sonner";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <HeroSection />
        <ArticlesSection />
      </div>
      <Footer />
      <Toaster
        toastOptions={{
          unstyled: true,
        }}
      />
    </div>
  );
}

export default App