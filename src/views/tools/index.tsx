import { FC } from "react";
import { LuRocket, LuCoins, LuSend, LuFileText, LuMail, LuGift, LuArrowRight, LuCheckCircle, LuZap, LuShield, LuEdit } from "react-icons/lu";

export const ToolView: FC = ({
  setOpenCreateModal,
  setOpenTokenMetaData,
  setOpenContact,
  setOpenAirdrop,
  setOpenSendTransaction,
  setOpenUpdateMetadata,
}) => {
  const tools = [
    {
      name: "Token Creator",
      icon: <LuRocket />,
      description: "Create professional Solana tokens with custom metadata, supply control, and instant deployment to any network.",
      function: setOpenCreateModal,
      color: "from-purple-500 to-pink-500",
      features: ["Custom Metadata", "Supply Control", "Instant Deploy", "Multi-Network"],
      popular: true
    },
    {
      name: "Update Metadata",
      icon: <LuEdit />,
      description: "Modify existing token metadata including name, symbol, description, and visual assets with blockchain verification.",
      function: setOpenUpdateMetadata,
      color: "from-orange-500 to-red-500",
      features: ["Edit Metadata", "Update Images", "IPFS Storage", "On-chain Update"],
      popular: false
    },
    {
      name: "SOL Airdrop",
      icon: <LuGift />,
      description: "Get free SOL tokens instantly for testing and development on Solana devnet and testnet networks.",
      function: setOpenAirdrop,
      color: "from-blue-500 to-cyan-500",
      features: ["Instant Delivery", "Free Testing", "Devnet Support", "No Limits"]
    },
    {
      name: "SOL Transfer",
      icon: <LuSend />,
      description: "Send SOL tokens securely with enterprise-grade security, instant confirmation, and minimal fees.",
      function: setOpenSendTransaction,
      color: "from-green-500 to-emerald-500",
      features: ["Secure Transfer", "Low Fees", "Instant Confirm", "Global Access"]
    },
    {
      name: "Token Metadata",
      icon: <LuFileText />,
      description: "Explore and analyze comprehensive token metadata including verification, assets, and on-chain data.",
      function: setOpenTokenMetaData,
      color: "from-indigo-500 to-purple-500",
      features: ["Metadata Explorer", "On-chain Data", "Asset Viewer", "Verification"]
    },
    {
      name: "Contact Support",
      icon: <LuMail />,
      description: "Get expert help from our blockchain specialists with 24/7 support and comprehensive documentation.",
      function: setOpenContact,
      color: "from-teal-500 to-blue-500",
      features: ["24/7 Support", "Expert Help", "Fast Response", "Documentation"]
    },
    {
      name: "Token Analytics",
      icon: <LuCoins />,
      description: "Advanced analytics and insights for your tokens including holder distribution and transaction history.",
      function: () => {},
      color: "from-yellow-500 to-orange-500",
      features: ["Holder Analytics", "Transaction History", "Price Tracking", "Market Data"],
      comingSoon: true
    }
  ];

  const benefits = [
    {
      icon: <LuZap />,
      title: "Lightning Fast",
      description: "Deploy tokens in under 10 seconds"
    },
    {
      icon: <LuShield />,
      title: "Enterprise Security",
      description: "Military-grade security protocols"
    },
    {
      icon: <LuCheckCircle />,
      title: "99.9% Success Rate",
      description: "Proven reliability and performance"
    }
  ];

  return (
    <section id="tools" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              Professional Tools
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Complete Solana
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Development Suite
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Everything you need to create, manage, and analyze Solana tokens. 
            Professional-grade tools designed for developers and creators.
          </p>
        </div>

        {/* Benefits Bar */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Popular Badge */}
              {tool.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              {/* Coming Soon Badge */}
              {tool.comingSoon && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  COMING SOON
                </div>
              )}

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${tool.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {tool.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {tool.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {tool.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {tool.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <LuCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => !tool.comingSoon && tool.function(true)}
                disabled={tool.comingSoon}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                  tool.comingSoon
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r ${tool.color} hover:shadow-lg text-white transform hover:scale-[1.02] group/btn`
                }`}
              >
                <span>{tool.comingSoon ? 'Coming Soon' : 'Launch Tool'}</span>
                {!tool.comingSoon && (
                  <LuArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                )}
              </button>

              {/* Border Effect */}
              {!tool.comingSoon && (
                <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${tool.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 lg:p-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Building?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers using MGF DEV to create the next generation of Solana tokens.
            </p>
            <button
              onClick={() => setOpenCreateModal(true)}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span>Create Your First Token</span>
                <LuRocket className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              10,000+
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Tokens Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              5,000+
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              99.9%
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};