import { FC } from "react";
import { MdGeneratingTokens, MdToken, MdContactMail } from "react-icons/md";
import { RiTokenSwapFill, RiAirplayFill } from "react-icons/ri";
import { RxTokens } from "react-icons/rx";
import { FaRocket, FaChartLine } from "react-icons/fa";
import { LuArrowRight, LuStar } from "react-icons/lu";

export const ToolView: FC = ({
  setOpenTokenMetaData,
  setOpenContact,
  setOpenAirdrop,
  setOpenSendTransaction,
  setOpenCreateModal,
}) => {
  const tools = [
    {
      name: "Create Token",
      icon: <MdGeneratingTokens />,
      function: setOpenCreateModal,
      color: "from-purple-500 to-pink-500",
      description: "Launch your custom Solana token with advanced features",
      popular: true
    },
    {
      name: "Token Metadata",
      icon: <RxTokens />,
      function: setOpenTokenMetaData,
      color: "from-blue-500 to-cyan-500",
      description: "View and analyze comprehensive token information"
    },
    {
      name: "Contact Support",
      icon: <MdContactMail />,
      function: setOpenContact,
      color: "from-green-500 to-emerald-500",
      description: "Get expert support from our development team"
    },
    {
      name: "SOL Airdrop",
      icon: <RiAirplayFill />,
      function: setOpenAirdrop,
      color: "from-yellow-500 to-orange-500",
      description: "Get free SOL tokens for testing and development"
    },
    {
      name: "Send Transaction",
      icon: <RiTokenSwapFill />,
      function: setOpenSendTransaction,
      color: "from-indigo-500 to-purple-500",
      description: "Transfer SOL tokens securely and instantly"
    },
    {
      name: "Token Explorer",
      icon: <FaChartLine />,
      function: setOpenCreateModal,
      color: "from-red-500 to-pink-500",
      description: "Explore and discover Solana ecosystem tokens"
    },
    {
      name: "Portfolio Tracker",
      icon: <MdToken />,
      function: setOpenCreateModal,
      color: "from-teal-500 to-blue-500",
      description: "Track and manage your token portfolio"
    },
    {
      name: "Launch Pad",
      icon: <FaRocket />,
      function: setOpenCreateModal,
      color: "from-violet-500 to-purple-500",
      description: "Launch your token project to the community"
    },
  ];

  return (
    <section id="tools" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              Professional Solana Tools
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Complete Toolkit for
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Solana Development
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Everything you need to build, deploy, and manage Solana tokens. 
            Professional-grade tools designed for developers, creators, and businesses.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              onClick={() => tool.function(true)}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Popular Badge */}
              {tool.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <LuStar className="w-3 h-3" />
                  Popular
                </div>
              )}

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${tool.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {tool.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {tool.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                {tool.description}
              </p>

              {/* Action */}
              <div className="flex items-center justify-between">
                <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  Try Now
                </span>
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                  <LuArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${tool.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build the Future?
              </h3>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of developers creating innovative solutions on Solana with MGF DEV's professional toolkit.
              </p>
              <button 
                onClick={() => setOpenCreateModal(true)}
                className="inline-flex items-center gap-3 bg-white text-purple-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MdGeneratingTokens className="w-5 h-5" />
                Start Building Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};