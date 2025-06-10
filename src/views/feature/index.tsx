import { FC } from "react";
import { LuArrowRightFromLine, LuShield, LuZap, LuCode, LuUsers } from "react-icons/lu";
import { MdGeneratingTokens, MdToken, MdSecurity } from "react-icons/md";
import { RiTokenSwapFill } from "react-icons/ri";
import { RxTokens } from "react-icons/rx";

export const FeatureView: FC = ({
  setOpenTokenMetaData,
  setOpenContact,
  setOpenAirdrop,
  setOpenSendTransaction,
  setOpenCreateModal,
}) => {
  const features = [
    {
      name: "Token Generator",
      icon: <MdGeneratingTokens />,
      description: "Create professional Solana tokens with custom metadata, supply control, and instant deployment to the blockchain.",
      function: setOpenCreateModal,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Get Airdrop",
      icon: <MdToken />,
      description: "Receive free SOL tokens for testing and development on Solana devnet and testnet networks.",
      function: setOpenAirdrop,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Transfer SOL",
      icon: <RiTokenSwapFill />,
      description: "Send SOL tokens securely with instant confirmation and low transaction fees on Solana network.",
      function: setOpenSendTransaction,
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Token Metadata",
      icon: <RxTokens />,
      description: "View, analyze, and update token metadata including name, symbol, description, and visual assets.",
      function: setOpenTokenMetaData,
      color: "from-orange-500 to-red-500"
    },
  ];

  const benefits = [
    {
      icon: <LuShield />,
      title: "Secure & Reliable",
      description: "Built with enterprise-grade security and audited smart contracts"
    },
    {
      icon: <LuZap />,
      title: "Lightning Fast",
      description: "Deploy tokens in seconds with Solana's high-performance blockchain"
    },
    {
      icon: <LuCode />,
      title: "No Code Required",
      description: "Create professional tokens without any programming knowledge"
    },
    {
      icon: <LuUsers />,
      title: "Community Driven",
      description: "Join thousands of developers building on Solana ecosystem"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full mb-6">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              FEATURES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Solana Blockchain
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Token Generator
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create Solana tokens instantly without any coding knowledge. 
            Professional tools for the next generation of blockchain developers.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="group relative bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Action Button */}
              <button
                onClick={() => feature.function(true)}
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors group/btn"
              >
                <span>Try Feature</span>
                <LuArrowRightFromLine className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Border Effect */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose MGF DEV?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built by developers, for developers. Experience the future of token creation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="text-center group">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};