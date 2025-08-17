import HeroSlider from "../components/HomeComponents/HeroSlider";
import WelcomeSection from "../components/HomeComponents/WelcomeSection";
import CategorySection from "../components/HomeComponents/CategorySection";
import WeServeSection from "../components/HomeComponents/WeServeSection";
import Gallery from "../components/HomeComponents/Gallery";
import RegionalDishes from "../components/HomeComponents/RegionalDishes";
import ClientReviews from "../components/HomeComponents/ClientReviews";

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
