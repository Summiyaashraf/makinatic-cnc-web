import Navbar from "@/src/app/components/Navbar";
import Footer from "@/src/app/components/Footer";
import ProductSection from "@/src/app/components/Products";

export default function AllProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-10"> 
        <ProductSection isFullPage={true} />
      </div>
      <Footer />
    </main>
  );
}
