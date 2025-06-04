import Categories from "../components/Home/Categories/Categories";
import Footer from "../components/Home/Footer/Footer";
import HeroSection from "../components/Home/HeroSection/HeroSection";
import Products from "../components/Home/Products/Products";
import Subscribe from "../components/Home/SubsCribe/Subscribe";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <Products />
      <Subscribe />
      <Footer />
    </>
  );
};

export default Home;
