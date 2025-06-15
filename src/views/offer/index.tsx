import { FC } from "react";
import { LuFileText, LuPen, LuDatabase, LuGitlab, LuPalette, LuCaseSensitive, LuArrowRight, LuCheckCircle, LuStar } from "react-icons/lu";

export const OfferView: FC = () => {
  const offerings = [
    {
      icon: <LuFileText />,
      title: "Professional Token Builder",
      description: "Create enterprise-grade Solana tokens with advanced features, custom metadata, and instant blockchain deployment with zero coding required.",
      color: "from-purple-500 to-pink-500",
      features: ["Custom Metadata", "Instant Deploy", "Zero Code", "Enterprise Grade"]
    },
    {
      icon: <LuPen />,
      title: "Dynamic Metadata Management",
      description: "Manage and update token metadata dynamically with our intuitive interface, real-time preview, and comprehensive version control system.",
      color: "from-blue-500 to-cyan-500",
      features: ["Real-time Preview", "Version Control", "Dynamic Updates", "Intuitive Interface"]
    },
    {
      icon: <LuDatabase />,
      title: "Advanced Analytics & Insights",
      description: "Comprehensive analytics and insights for your tokens with advanced reporting, market data integration, and performance tracking.",
      color: "from-green-500 to-emerald-500",
      features: ["Market Data", "Performance Tracking", "Advanced Reports", "Real-time Analytics"]
    },
    {
      icon: <LuGitlab />,
      title: "Developer Tools & APIs",
      description: "Access to smart contract templates, code snippets, comprehensive APIs, and development tools for advanced customization.",
      color: "from-orange-500 to-red-500",
      features: ["Smart Contracts", "Code Templates", "APIs", "Dev Tools"]
    },
    {
      icon: <LuPalette />,
      title: "Visual Design Studio",
      description: "Create stunning tokens without programming knowledge using our visual design tools, templates, and drag-and-drop interface.",
      color: "from-indigo-500 to-purple-500",
      features: ["Visual Tools", "Templates", "Drag & Drop", "No Code Design"]
    },
    {
      icon: <LuCaseSensitive />,
      title: "Complete Solana Toolkit",
      description: "Comprehensive toolkit including wallet integration, transaction monitoring, multi-language support, and enterprise features.",
      color: "from-teal-500 to-blue-500",
      features: ["Wallet Integration", "Transaction Monitor", "Multi-language", "Enterprise Ready"]
    },
  ];

  const stats = [
    { number: "50,000+", label: "Tokens Created", icon: "🚀" },
    { number: "2,500+", label: "Active Developers", icon: "👨‍💻" },
    { number: "99.99%", label: "Uptime Guarantee", icon: "⚡" },
    { number: "24/7", label: "Expert Support", icon: "🛟" }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "DeFi Developer",
      content: "MGF DEV made token creation incredibly simple. Deployed my first token in under 5 minutes!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Blockchain Entrepreneur",
      content: "The best Solana token creation platform. Professional features with zero complexity.",
      rating: 5
    }
  ];

  return (
    <section id="offer" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              What We Offer
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Solana Token Platform
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Features & Capabilities
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive Solana token creation platform with enterprise-grade features for developers, 
            creators, and businesses building the future of decentralized finance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-10 mb-20">
          {offerings.map((offer, index) => (
            <div
              key={offer.title}
              className="group bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${offer.color} text-white mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {offer.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {offer.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {offer.description}
              </p>

              {/* Features List */}
              <div className="space-y-2 mb-8">
                {offer.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <LuCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-3 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors group/btn">
                <span>Learn More</span>
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center group-hover/btn:bg-purple-200 dark:group-hover/btn:bg-purple-900/50 transition-colors">
                  <LuArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              {/* Border Effect */}
              <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${offer.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Developers Worldwide
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              See what our community is saying about MGF DEV
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <LuStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            
            <div className="relative">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Build on Solana?
              </h3>
              <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
                Join thousands of developers creating the future of decentralized finance. 
                Start building with MGF DEV's professional toolkit today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started Free
                </button>
                <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white hover:text-purple-600 transition-all duration-300">
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};