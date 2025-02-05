import Header from "../components/DashboardHeader";
import Main from "../components/DashboardMain";
import Footer from "../components/Footer";
import Nav from "../components/Navigation";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4">
      <Nav />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
