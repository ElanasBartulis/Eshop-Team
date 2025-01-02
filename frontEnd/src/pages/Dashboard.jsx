import Header from '../components/DashboardHeader';
import Main from '../components/DashboardMain';
import Footer from '../components/Footer';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
