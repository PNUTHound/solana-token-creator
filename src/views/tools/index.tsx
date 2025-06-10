import { FC } from "react";
import { MdGeneratingTokens, MdToken, MdContactMail } from "react-icons/md";
import { RiTokenSwapFill, RiAirplayFill } from "react-icons/ri";
import { RxTokens } from "react-icons/rx";
import { FaRocket, FaChartLine } from "react-icons/fa";
import { LuArrowRightFromLine } from "react-icons/lu";

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
      description: "Launch your custom Solana token"
    },
    {
      name: "Token Metadata",
      icon: <RxTokens />,
      function: setOpenTokenMetaData,
      color: "from-blue-500 to-cyan-500",
      description: "View and analyze token information"
    },
    {
      name: "Contact Us",
      icon: <MdContactMail />,
      function: setOpenContact,
      color: "from-green-500 to-emerald-500",
      description: "Get support from our team"
    },
    {
      name: "Airdrop",
      icon: <RiAirplayFill />,
      function: setOpenAirdrop,
      color: "from-yellow-500 to-orange-500",
      description: "Get free SOL for testing"
    },
    {
      name: "Send Transaction",
      icon: <RiTokenSwapFill />,
      function: setOpenSendTransaction,
      color: "from-indigo-500 to-purple-500",
      description: "Transfer SOL securely"
    },
    {
      name: "Token Explorer",
      icon: <FaChartLine />,
      function: setOpenCreateModal,
      color: "from-red-500 to-pink-500",
      description: "Explore Solana tokens"
    },
    {
      name: "Portfolio Tracker",
      icon: <MdToken />,
      function: setOpenCreateModal,
      color: "from-teal-500 to-blue-500",
      description: "Track your token portfolio"
    },
    {
      name: "Launch Pad",
      icon: <FaRocket />,
      function: setOpenCreateModal,
      color: "from-violet-500 to-purple-500",
      description: "Launch your token project"
    },
  ];

  return (
    <section id="tools" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full mb-6">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              MGF DEV TOOLS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Solana Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Complete toolkit for Solana token creation, management, and deployment. 
            Build, deploy, and manage your tokens with professional-grade tools.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              onClick={() => tool.function(true)}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${tool.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {tool.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {tool.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {tool.description}
              </p>

              {/* Action */}
              <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                <span>Try Now</span>
                <LuArrowRightFromLine className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span>Explore All Tools</span>
            <LuArrowRightFromLine className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};