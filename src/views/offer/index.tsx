import { FC } from "react";
import { LuCheck, LuStar, LuRocket, LuShield, LuZap, LuUsers, LuArrowRight, LuCrown, LuInfinity } from "react-icons/lu";

export const OfferView: FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for testing and small projects",
      icon: <LuRocket />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "5 tokens per month",
        "Basic metadata support",
        "Devnet deployment",
        "Community support",
        "Standard templates",
        "Basic analytics"
      ],
      limitations: [
        "Limited to devnet",
        "Basic support only"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for serious developers and businesses",
      icon: <LuCrown />,
      color: "from-purple-500 to-pink-500",
      features: [
        "Unlimited tokens",
        "Advanced metadata",
        "Mainnet deployment",
        "Priority support",
        "Custom templates",
        "Advanced analytics",
        "Bulk operations",
        "API access",
        "White-label options"
      ],
      limitations: [],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations and institutions",
      icon: <LuInfinity />,
      color: "from-indigo-500 to-purple-500",
      features: [
        "Everything in Professional",
        "Dedicated support team",
        "Custom integrations",
        "SLA guarantees",
        "Advanced security",
        "Multi-tenant support",
        "Custom branding",
        "Training sessions",
        "Compliance support"
      ],
      limitations: [],
      popular: false
    }
  ];

  const services = [
    {
      icon: <LuRocket />,
      title: "Token Creation",
      description: "Professional Solana token creation with custom metadata and instant deployment",
      features: ["Custom Metadata", "Instant Deploy", "Multi-Network", "Bulk Creation"]
    },
    {
      icon: <LuShield />,
      title: "Security Audit",
      description: "Comprehensive security audits for your tokens and smart contracts",
      features: ["Code Review", "Vulnerability Assessment", "Best Practices", "Compliance Check"]
    },
    {
      icon: <LuZap />,
      title: "Performance Optimization",
      description: "Optimize your tokens for maximum performance and minimal fees",
      features: ["Gas Optimization", "Speed Enhancement", "Cost Reduction", "Scalability"]
    },
    {
      icon: <LuUsers />,
      title: "Consulting Services",
      description: "Expert blockchain consulting for your Solana projects",
      features: ["Strategy Planning", "Technical Guidance", "Market Analysis", "Implementation"]
    }
  ];

  const testimonials = [
    {
      name: "David Kim",
      role: "CTO, DeFi Startup",
      content: "MGF DEV's professional plan saved us months of development time. The API integration was seamless.",
      rating: 5,
      company: "DeFi Innovations"
    },
    {
      name: "Maria Garcia",
      role: "Blockchain Developer",
      content: "The enterprise support is outstanding. They helped us scale our token creation process efficiently.",
      rating: 5,
      company: "Crypto Solutions"
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      content: "From free tier to enterprise, MGF DEV grows with your needs. Excellent platform and support.",
      rating: 5,
      company: "Blockchain Ventures"
    }
  ];

  const faqs = [
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes 5 token creations per month, basic metadata support, devnet deployment, and community support."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. Contact our support team for assistance."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees for any of our plans. You only pay the monthly subscription fee."
    }
  ];

  return (
    <section id="offer" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              Pricing & Services
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Choose Your
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            From free testing to enterprise solutions, we have the perfect plan for your Solana token creation needs.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 transition-all duration-500 border-2 ${
                plan.popular 
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/20 scale-105' 
                  : 'border-gray-200 dark:border-gray-700 hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${plan.color} text-white mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 dark:text-gray-400">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <LuCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, idx) => (
                  <div key={idx} className="flex items-center gap-3 opacity-60">
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg transform hover:scale-[1.02]`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Services
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Beyond token creation, we offer comprehensive blockchain services to support your entire project lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white mb-4">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <LuCheck className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Clients Say
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Trusted by developers and businesses worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
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
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 lg:p-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get answers to common questions about our pricing and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building the future of Solana with MGF DEV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};