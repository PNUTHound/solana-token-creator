import { FC } from "react";
import { LuArrowRight, LuShield, LuZap, LuCode, LuUsers, LuCheckCircle } from "react-icons/lu";
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
      name: "Advanced Token Generator",
      icon: <MdGeneratingTokens />,
      description: "Create professional Solana tokens with custom metadata, supply control, freeze authority, and instant deployment to mainnet or testnet.",
      function: setOpenCreateModal,
      color: "from-purple-500 to-pink-500",
      highlights: ["Custom Metadata", "Supply Control", "Instant Deploy", "Freeze Authority"]
    },
    {
      name: "Free SOL Airdrop",
      icon: <MdToken />,
      description: "Receive free SOL tokens for comprehensive testing and development on Solana devnet and testnet networks with instant delivery.",
      function: setOpenAirdrop,
      color: "from-blue-500 to-cyan-500",
      highlights: ["Instant Delivery", "Devnet & Testnet", "No Limits", "Free Testing"]
    },
    {
      name: "Secure SOL Transfer",
      icon: <RiTokenSwapFill />,
      description: "Send SOL tokens securely with enterprise-grade security, instant confirmation, and minimal transaction fees on Solana's fast network.",
      function: setOpenSendTransaction,
      color: "from-green-500 to-emerald-500",
      highlights: ["Enterprise Security", "Instant Confirmation", "Low Fees", "Fast Network"]
    },
    {
      name: "Token Metadata Explorer",
      icon: <RxTokens />,
      description: "View, analyze, and update comprehensive token metadata including name, symbol, description, visual assets, and on-chain verification.",
      function: setOpenTokenMetaData,
      color: "from-orange-500 to-red-500",
      highlights: ["Metadata Analysis", "On-chain Verification", "Visual Assets", "Real-time Updates"]
    },
  ];

  const benefits = [
    {
      icon: <LuShield />,
      title: "Enterprise Security",
      description: "Built with military-grade security protocols and audited smart contracts for maximum protection"
    },
    {
      icon: <LuZap />,
      title: "Lightning Performance",
      description: "Deploy tokens in under 10 seconds with Solana's high-performance blockchain infrastructure"
    },
    {
      icon: <LuCode />,
      title: "Zero Code Required",
      description: "Create professional-grade tokens without any programming knowledge or technical expertise"
    },
    {
      icon: <LuUsers />,
      title: "Community Driven",
      description: "Join 10,000+ developers building the future of decentralized finance on Solana"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              Advanced Features
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Why Choose Solana
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Token Generator
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Create Solana tokens instantly with our professional no-code platform. 
            Advanced tools designed for the next generation of blockchain innovators.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r ${feature.color} text-white mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {feature.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                {feature.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <LuCheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => feature.function(true)}
                className="inline-flex items-center gap-3 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors group/btn"
              >
                <span>Try Feature</span>
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center group-hover/btn:bg-purple-200 dark:group-hover/btn:bg-purple-900/50 transition-colors">
                  <LuArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              {/* Border Effect */}
              <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 lg:p-16">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Developers Choose MGF DEV
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built by blockchain experts, trusted by thousands of developers worldwide. 
              Experience the future of token creation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="text-center group">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              10,000+
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Tokens Created</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              99.9%
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              &lt;10s
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Deploy Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};