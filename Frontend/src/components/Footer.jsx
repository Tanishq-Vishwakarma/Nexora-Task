import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300">Vibe Commerce</h3>
            <p className="text-blue-100 text-sm">
              Your one-stop shop for the latest tech products. Quality products at great prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-blue-100 hover:text-yellow-200 transition text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-blue-100 hover:text-yellow-200 transition text-sm"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Contact Us</h4>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>Email: support@vibecommerce.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Commerce St, City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-400 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Vibe Commerce. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-100 hover:text-yellow-200 transition text-sm"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-yellow-200 transition text-sm"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-yellow-200 transition text-sm"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

