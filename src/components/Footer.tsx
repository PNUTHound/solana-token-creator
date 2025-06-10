import { FC } from "react";
import { useForm, ValidationError } from "@formspree/react";
import {
  LuFacebook,
  LuLinkedin,
  LuTwitter,
  LuYoutube,
  LuMail,
  LuMapPin,
  LuClock,
  LuHeart,
} from "react-icons/lu";

export const Footer: FC = () => {
  const [state, handleSubmit] = useForm("mzbnzpqr");
  
  if (state.succeeded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuHeart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your message has been sent successfully. We'll get back to you soon!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const companyLinks = [
    "About MGF DEV",
    "Our Mission",
    "Team",
    "Careers",
    "Press Kit",
  ];

  const productLinks = [
    "Token Creator",
    "Portfolio Tracker",
    "Analytics",
    "API Documentation",
    "Roadmap",
  ];

  const supportLinks = [
    "Help Center",
    "Community",
    "Contact Support",
    "Bug Reports",
    "Feature Requests",
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold">MGF DEV</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Building the future of Solana token creation with innovative, 
              user-friendly tools for developers and creators worldwide.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <LuMail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">contact@mgfdev.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <LuMapPin className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">Global Remote Team</span>
              </div>
              <div className="flex items-center space-x-3">
                <LuClock className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Get the latest updates and news about MGF DEV.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              />
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
              >
                {state.submitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              {[
                { icon: LuFacebook, href: "#" },
                { icon: LuTwitter, href: "#" },
                { icon: LuLinkedin, href: "#" },
                { icon: LuYoutube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-center">
              © 2024 MGF DEV. Made with{" "}
              <LuHeart className="inline w-4 h-4 text-red-500" /> by{" "}
              <span className="text-purple-400">@theblockchaincoders</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};