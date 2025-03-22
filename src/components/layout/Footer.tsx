
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-medium tracking-tight">
              MINIMAL
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Curated products with an emphasis on design, quality, and simplicity.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2">
              {["All Products", "Featured", "New Arrivals", "Best Sellers", "Sale"].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-gray-600 hover:text-black transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">About</h3>
            <ul className="space-y-2">
              {["Our Story", "Sustainability", "Careers", "Press", "Customer Reviews"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Help</h3>
            <ul className="space-y-2">
              {["Shipping & Returns", "FAQ", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {currentYear} MINIMAL. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
