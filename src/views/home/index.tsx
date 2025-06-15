import { FC } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LuStar, LuUsers, LuZap, LuShield } from "react-icons/lu";
import pkg from "../../../package.json";

export const HomeView: FC = ({ setOpenCreateModal }) => {
  const stats = [
    { icon: <LuUsers />, number: "10,000+", label: "Tokens Created" },
    { icon: <LuZap />, number: "500+", label: "Active Users" },
    { icon: <LuShield />, number: "99.9%", label: "Uptime" },
    { icon: <LuStar />, number: "24/7", label: "Support" }
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
                <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
                  MGF DEV TOKEN CREATOR v{pkg.version}
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  Create Solana
                  <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Tokens Instantly
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  Launch your Solana Token with our professional no-code platform. 
                  Create, deploy, and manage tokens with enterprise-grade security and lightning-fast deployment.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <MdGeneratingTokens className="w-5 h-5" />
                  </div>
                  Create Token Now
                </button>
                
                <div className="wallet-adapter-button-wrapper">
                  <WalletMultiButton className="!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white hover:!bg-gray-50 dark:hover:!bg-gray-700 !border-2 !border-gray-200 dark:!border-gray-600 !rounded-2xl !font-semibold !px-8 !py-4 !transition-all !duration-300 !shadow-lg hover:!shadow-xl" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Section */}
            <div className="relative">
              <div className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 shadow-2xl">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
                
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4 h-full p-6">
                  {/* Left Column */}
                  <div className="space-y-4 animate-float">
                    {["img-9", "img-14", "img-21", "img-22", "img-10"].map((image, index) => (
                      <div key={index} className="relative group overflow-hidden rounded-2xl">
                        <img
                          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                          src={`assets/images/ai/${image}.jpg`}
                          alt="MGF DEV Token"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4 animate-float-delayed">
                    {["img-6", "img-10", "img-11", "img-12", "img-13"].map((image, index) => (
                      <div key={index} className="relative group overflow-hidden rounded-2xl">
                        <img
                          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                          src={`assets/images/ai/${image}.jpg`}
                          alt="MGF DEV Token"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Ready to Launch?</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Create your token in minutes</p>
                    </div>
                    <button
                      onClick={() => setOpenCreateModal(true)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
  );
};