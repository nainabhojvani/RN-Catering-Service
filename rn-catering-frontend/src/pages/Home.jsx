import HeroSlider from "../components/HeroSlider";
import WelcomeSection from "../components/WelcomeSection";
import CategorySection from "../components/CategorySection";
import WeServeSection from "../components/WeServeSection";
import Gallery from "../components/Gallery";
import RegionalDishes from "../components/RegionalDishes";
import ClientReviews from "../components/ClientReviews";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <WelcomeSection />
      <CategorySection />
      <WeServeSection />
      <Gallery />
      <RegionalDishes />
      <ClientReviews />
    </>
  );
}