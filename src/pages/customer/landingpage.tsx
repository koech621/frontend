import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">


      {/* Hero Section */}
      <section
        className="flex-grow bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: "url('/images/farm-hero.jpg')", // replace with your image path
        }}
      >
        <div className="bg-black bg-opacity-40 p-8 rounded-lg text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Farmers Digital Market
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Fresh produce directly from your local farmers.
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Farmers Digital Market. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
