import { FC } from "react";
import { LuRocket, LuShield, LuZap, LuUsers, LuArrowRight, LuStar, LuTrendingUp, LuCode, LuGlobe } from "react-icons/lu";

export const HomeView: FC = ({ setOpenCreateModal }) => {
  const stats = [
    { number: "10,000+", label: "Tokens Created", icon: <LuRocket /> },
    { number: "99.9%", label: "Success Rate", icon: <LuShield /> },
    { number: "<10s", label: "Deploy Time", icon: <LuZap /> },
    { number: "5,000+", label: "Active Users", icon: <LuUsers /> }
  ];

  const features = [
    {
      icon: <LuCode />,
      title: "No Code Required",
      description: "Create professional tokens without any programming knowledge"
    },
    {
      icon: <LuZap />,
      title: "Lightning Fast",
      description: "Deploy your token in under 10 seconds on Solana"
    },
    {
      icon: <LuShield />,
      title: "Enterprise Security",
      description: "Built with military-grade security and audited smart contracts"
    },
    {
      icon: <LuGlobe />,
      title: "Global Access",
      description: "Available worldwide with 24/7 support and documentation"
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "DeFi Developer",
      content: "MGF DEV made token creation incredibly simple. Deployed my first token in minutes!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Blockchain Entrepreneur",
      content: "The best token creation platform I've used. Professional results every time.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Crypto Startup Founder",
      content: "Saved us weeks of development time. Highly recommend for any Solana project.",
      rating: 5
    }
  ];

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8">
            <LuStar className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              #1 Solana Token Creator
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Create Solana
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Tokens Instantly
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            The most advanced no-code platform for creating professional Solana tokens. 
            Deploy in seconds, not hours. Trusted by 10,000+ developers worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => setOpenCreateModal(true)}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 text-lg"
            >
              <div className="flex items-center gap-3">
                <span>Create Token Now</span>
                <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button className="group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-5 px-10 rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 text-lg">
              <div className="flex items-center gap-3">
                <span>View Documentation</span>
                <LuCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <LuShield className="w-5 h-5" />
              <span className="text-sm font-medium">Audited & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <LuZap className="w-5 h-5" />
              <span className="text-sm font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <LuUsers className="w-5 h-5" />
              <span className="text-sm font-medium">10K+ Users</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={stat.label} className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose MGF DEV?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built by blockchain experts, trusted by developers worldwide. 
              Experience the future of token creation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="group text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 lg:p-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Developers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our community is saying about MGF DEV
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
        <div className="text-center mt-24">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to Create Your Token?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of developers who trust MGF DEV for their token creation needs.
          </p>
          <button
            onClick={() => setOpenCreateModal(true)}
            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 text-xl"
          >
            <div className="flex items-center gap-3">
              <span>Start Building Now</span>
              <LuRocket className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform" />
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};