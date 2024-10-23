import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/footer";
import ArticlesSection from "./components/ArticlesSection";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <HeroSection />
        <ArticlesSection />
      </div>
      <Footer />
    </div>
  );
}

export default App