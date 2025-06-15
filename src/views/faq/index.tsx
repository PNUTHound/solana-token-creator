import { FC, useState } from "react";
import { LuChevronDown, LuHelpCircle, LuMessageCircle, LuBook, LuUsers } from "react-icons/lu";

export const FaqView: FC = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <LuBook />,
      faqs: [
        {
          question: "What is MGF DEV Token Creator?",
          answer: "MGF DEV Token Creator is a comprehensive, professional-grade platform for creating, deploying, and managing Solana tokens without any coding knowledge. Our platform provides enterprise-level tools for developers, creators, and businesses looking to build on the Solana blockchain.",
          id: "faq-1",
        },
        {
          question: "How much does it cost to create a token?",
          answer: "Creating a token requires only the minimal network fees for deploying to the Solana blockchain (typically less than $0.01). Our platform is completely free to use - you only pay the Solana transaction fees. No hidden costs, no subscription fees, no premium tiers.",
          id: "faq-2",
        },
        {
          question: "Do I need coding experience to create tokens?",
          answer: "Absolutely not! Our intuitive, visual interface allows anyone to create professional Solana tokens without any programming knowledge. Simply fill in your token details, upload an image, customize your settings, and deploy with one click.",
          id: "faq-3",
        }
      ]
    },
    {
      title: "Technical Details",
      icon: <LuHelpCircle />,
      faqs: [
        {
          question: "What networks are supported?",
          answer: "We support all Solana networks: mainnet-beta (production), devnet (development), and testnet (testing). You can easily switch between networks using our network selector. We strongly recommend testing on devnet before deploying to mainnet.",
          id: "faq-4",
        },
        {
          question: "Can I update my token metadata after creation?",
          answer: "Yes, token metadata can be updated if you maintain update authority during creation. Our platform provides comprehensive tools to view, analyze, and update token metadata when possible. You can modify name, symbol, description, and image.",
          id: "faq-5",
        },
        {
          question: "Is my wallet secure when using MGF DEV?",
          answer: "Absolutely. We use industry-standard wallet adapters and never store your private keys. All transactions are signed locally in your wallet, ensuring maximum security. We support all major Solana wallets including Phantom, Solflare, and more.",
          id: "faq-6",
        }
      ]
    },
    {
      title: "Platform Features",
      icon: <LuUsers />,
      faqs: [
        {
          question: "What file formats are supported for token images?",
          answer: "We support all common image formats including PNG, JPG, JPEG, GIF, and SVG. Images are automatically optimized and stored on IPFS for decentralized access. Maximum file size is 10MB with automatic compression for optimal performance.",
          id: "faq-7",
        },
        {
          question: "How can I get support if I need help?",
          answer: "We offer comprehensive 24/7 community support through multiple channels: contact form, detailed documentation, video tutorials, and community forums. Our expert team is always ready to help you succeed with your token projects.",
          id: "faq-8",
        }
      ]
    }
  ];

  const toggleFaq = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFaq(openFaq === key ? null : key);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Got Questions?
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              We Have Answers
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Find comprehensive answers to common questions about MGF DEV Token Creator. 
            Our detailed FAQ covers everything from getting started to advanced features.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-5xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.title} className="mb-12">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const isOpen = openFaq === `${categoryIndex}-${faqIndex}`;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
                    >
                      <button
                        onClick={() => toggleFaq(categoryIndex, faqIndex)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </h4>
                        <LuChevronDown 
                          className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-8 pb-6">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <LuMessageCircle className="w-10 h-10" />
              </div>
              <h3 className="text-4xl font-bold mb-6">
                Still Have Questions?
              </h3>
              <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
                Our expert support team is here to help you succeed with your token creation journey. 
                Get personalized assistance from blockchain professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Contact Support
                </button>
                <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white hover:text-purple-600 transition-all duration-300">
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              &lt; 2 min
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Average Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              99.5%
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Expert Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};