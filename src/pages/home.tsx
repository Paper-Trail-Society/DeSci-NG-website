import { About, Footer, Header, Hero, Partners } from "../components";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <Partners />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
