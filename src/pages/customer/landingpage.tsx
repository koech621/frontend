import { Link } from "react-router-dom";
import Heroimage from "../../assets/images/farmerdigital.jpg";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section
        className="flex-grow relative flex flex-col justify-center items-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${Heroimage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 p-8 rounded-lg text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
            Welcome to Farmers Digital Market
          </h1>
          <p className="text-lg md:text-2xl mb-6 animate-fadeIn delay-200">
            Fresh produce directly from your local farmers.
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 hover:scale-105 transition transform shadow-lg animate-fadeIn delay-400"
          >
            Start Shopping
          </Link>
        </div>
      </section>
      

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center border-t border-green-600">
          <p>&copy; {new Date().getFullYear()} Farmers Digital Market. All rights reserved.</p>
        </div>
      </footer>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1s ease forwards; }
          .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
          .animate-fadeIn.delay-400 { animation-delay: 0.4s; }
        `}
      </style>
    </div>
  );
}
