import CheckoutComponent from '../components/CheckoutComponent';
import Nav from '../components/Navigation';

export default function Checkout() {

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4">
          <Nav />
          <CheckoutComponent />
        </div>
      </div>
    </>
  );
}