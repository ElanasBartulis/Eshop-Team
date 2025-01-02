import AdminContainer from "../components/AdminContainer";
import Settings from "../components/AdminSettings";
import Nav from "../components/Navigation";

export default function Admin() {
  return (
    <div className="container mx-auto px-4">
      <Nav />
      <div className="flex mt-16">
        <Settings />
        <AdminContainer />
      </div>
    </div>
  );
}
