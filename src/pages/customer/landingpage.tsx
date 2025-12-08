import { Link } from "react-router-dom";
import Heroimage from "../../assets/images/farmerdigital.jpg";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-white h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Heroimage})` }}
      >
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

      {/* About Us Section */}
      <section className="relative flex flex-col justify-center items-center text-white py-20 bg-gradient-to-r from-green-600 via-green-500 to-green-400">
        <div className="relative z-10 text-center max-w-3xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeIn">
            About Us
          </h2>
          <p className="text-lg md:text-xl leading-relaxed animate-fadeIn delay-200">
            Farmers Digital Market is your go-to online marketplace connecting you directly 
            with local farmers. We provide fresh, high-quality produce, empowering farmers 
            to reach more customers while offering you the freshest products available. 
            Our mission is to support sustainable farming, reduce food waste, and make 
            farm-to-table shopping simple and convenient for everyone.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Navigation Links */}
          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul>
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/products" className="hover:underline">Products</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-3">Contact Us</h3>
            <p>Email: info@farmersdigitalmarket.com</p>
            <p>Phone: +254 700 000 000</p>
            <p>Address: Nairobi, Kenya</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-3">Follow Us</h3>
            <div className="flex space-x-4 mt-2 text-lg">
              <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
              <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
              <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-300"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-green-600 pt-4">
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
