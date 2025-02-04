import DashboardMain from '../components/DashboardMain';
import Nav from '../components/Navigation';

export default function SalesPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4">
          <Nav />
          <DashboardMain />
        </div>
      </div>
    </>
  );
}
