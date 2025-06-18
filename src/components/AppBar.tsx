import { FC, useState } from "react";
import Link from "next/link";
import { LuMenu, LuX } from "react-icons/lu";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import NetworkSwitcher from "./NetworkSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export const AppBar: FC = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menu = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "Tools",
      link: "#tools",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#offer",
    },
    {
      name: "FAQ",
      link: "#faq",
    },
  ];

  return (
    <div>
      <header className="fixed top-0 inset-x-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                MGF DEV
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {menu.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              <NetworkSwitcher />
              <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 hover:!from-purple-700 hover:!to-blue-700 !border-none !rounded-xl !font-semibold !px-6 !py-3 !transition-all !duration-300 !shadow-lg hover:!shadow-xl" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="py-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
              {menu.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <ThemeToggle />
                  <NetworkSwitcher />
                </div>
                <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 hover:!from-purple-700 hover:!to-blue-700 !border-none !rounded-xl !font-semibold !px-6 !py-3 !transition-all !duration-300 !w-full !shadow-lg hover:!shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {props.children}
    </div>
  );
};