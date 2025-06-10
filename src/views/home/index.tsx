import { FC } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import pkg from "../../../package.json";

export const HomeView: FC = ({ setOpenCreateModal }) => {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-[72px] bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 dark:from-purple-900/40 dark:via-blue-900/40 dark:to-indigo-900/40">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="px-6 py-4 relative">
        <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl">
          <div className="container mx-auto">
            <div className="p-8 lg:p-12">
              <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                {/* Floating Elements */}
                <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 animate-spin-slow"></div>
                <div className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-30 animate-pulse"></div>

                {/* Content Section */}
                <div className="space-y-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
                      MGF DEV TOKEN CREATOR {pkg.version}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                      Create Solana Tokens
                      <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Without Code
                      </span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                      Launch your Solana Token with our all-in-one platform. 
                      Create, deploy, and manage tokens with zero coding required.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <button
                      onClick={() => setOpenCreateModal(true)}
                      className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <MdGeneratingTokens className="w-5 h-5" />
                      </div>
                      Create Token
                    </button>
                    
                    <div className="wallet-adapter-button-wrapper">
                      <WalletMultiButton className="!bg-gray-100 dark:!bg-gray-800 !text-gray-900 dark:!text-white hover:!bg-gray-200 dark:hover:!bg-gray-700 !border-gray-300 dark:!border-gray-600 !rounded-2xl !font-semibold !px-8 !py-4 !transition-all !duration-300" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Tokens Created</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                    </div>
                  </div>
                </div>

                {/* Visual Section */}
                <div className="relative h-[600px] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl"></div>
                  <div className="grid grid-cols-2 gap-6 h-full p-6">
                    {/* Left Column */}
                    <div className="space-y-6 animate-float">
                      {["img-9", "img-14", "img-21", "img-22", "img-10"].map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            className="w-full aspect-square rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                            src={`assets/images/ai/${image}.jpg`}
                            alt="MGF DEV Token"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 animate-float-delayed">
                      {["img-6", "img-10", "img-11", "img-12", "img-13"].map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            className="w-full aspect-square rounded-xl object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                            src={`assets/images/ai/${image}.jpg`}
                            alt="MGF DEV Token"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};