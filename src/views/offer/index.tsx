import { FC } from "react";
import { LuFileText, LuPen, LuDatabase, LuGitlab, LuPalette, LuCaseSensitive, LuArrowRight } from "react-icons/lu";

export const OfferView: FC = () => {
  const offerings = [
    {
      icon: <LuFileText />,
      title: "Best Token Builder",
      description: "Create professional Solana tokens with advanced features, custom metadata, and instant blockchain deployment.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <LuPen />,
      title: "Updated Metadata",
      description: "Manage and update token metadata dynamically with our intuitive interface and real-time preview.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <LuDatabase />,
      title: "Data Analysis & Solana",
      description: "Advanced analytics and insights for your tokens with comprehensive reporting and market data integration.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <LuGitlab />,
      title: "Code & Programming Solana",
      description: "Access to smart contract templates, code snippets, and development tools for advanced customization.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <LuPalette />,
      title: "Zero Code Solana",
      description: "Create stunning tokens without any programming knowledge using our visual design tools and templates.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <LuCaseSensitive />,
      title: "Solana Tools Suite",
      description: "Complete toolkit including wallet integration, transaction monitoring, and multi-language support.",
      color: "from-teal-500 to-blue-500"
    },
  ];

  const stats = [
    { number: "10,000+", label: "Tokens Created" },
    { number: "500+", label: "Active Developers" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section id="offer" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full mb-6">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              WHAT WE OFFER
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Solana Token
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Popularity & Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive Solana token creation platform with advanced features for developers, 
            creators, and businesses building on the Solana blockchain.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {offerings.slice(0, 2).map((offer, index) => (
              <div
                key={offer.title}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:-translate-y-2"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${offer.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {offer.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {offer.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {offer.description}
                </p>

                <button className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors group/btn">
                  <span>Learn More</span>
                  <LuArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            {offerings.slice(2, 4).map((offer, index) => (
              <div
                key={offer.title}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:-translate-y-2"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${offer.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {offer.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {offer.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {offer.description}
                </p>

                <button className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors group/btn">
                  <span>Learn More</span>
                  <LuArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {offerings.slice(4, 6).map((offer, index) => (
              <div
                key={offer.title}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:-translate-y-2"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${offer.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {offer.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {offer.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {offer.description}
                </p>

                <button className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors group/btn">
                  <span>Learn More</span>
                  <LuArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Build on Solana?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers creating the future of decentralized finance with MGF DEV.
            </p>
            <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};