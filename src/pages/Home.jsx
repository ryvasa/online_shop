import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Category from "../components/Category";
import Products from "../components/Products";
import Slide from "../components/Slide";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <Products />
      <Category />
      <Footer />
    </>
  );
};

export default Home;
