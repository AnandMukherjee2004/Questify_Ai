import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  return (
    <div>
      {/*header - navbar*/}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
