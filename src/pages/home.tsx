import { Footer, Header, Hero } from "../components";

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
      </div>
      <Footer />
    </>
  );
};

export default Home;
