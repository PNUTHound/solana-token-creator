import { FC, useState } from "react";
import { LuChevronDown, LuHelpCircle, LuMessageCircle, LuBook, LuShield, LuZap } from "react-icons/lu";

export const FaqView: FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <LuHelpCircle />,
      color: "from-blue-500 to-cyan-500",
      faqs: [
        {
          question: "What is MGF DEV Token Creator?",
          answer: "MGF DEV Token Creator is a professional no-code platform for creating Solana tokens instantly. It allows developers and creators to deploy custom tokens with metadata, supply control, and advanced features without any programming knowledge."
        },
        {
          question: "How long does it take to create a token?",
          answer: "Token creation typically takes less than 10 seconds once you've filled in the required information. Our platform is optimized for speed and efficiency, allowing you to deploy tokens instantly to Solana's mainnet, devnet, or testnet."
        },
        {
          question: "Do I need programming knowledge?",
          answer: "No programming knowledge is required! Our platform is designed to be user-friendly for everyone, from beginners to experienced developers. Simply fill in your token details, upload your image, and deploy with one click."
        },
        {
          question: "What networks are supported?",
          answer: "We support all Solana networks including Mainnet Beta, Devnet, and Testnet. You can easily switch between networks using our network selector in the top navigation."
        }
      ]
    },
    {
      title: "Token Creation",
      icon: <LuZap />,
      color: "from-purple-500 to-pink-500",
      faqs: [
        {
          question: "What information do I need to create a token?",
          answer: "To create a token, you need: Token Name, Symbol (3-5 characters), Decimals (usually 9), Total Supply, Token Image, and Description. All metadata is stored on IPFS for decentralized access."
        },
        {
          question: "Can I modify my token after creation?",
          answer: "Once deployed, basic token properties like supply and decimals cannot be changed. However, if you maintain update authority, you can modify metadata such as name, symbol, description, and image through our platform."
        },
        {
          question: "What file formats are supported for token images?",
          answer: "We support PNG, JPG, GIF, and WebP formats up to 10MB. Images are automatically optimized and stored on IPFS for permanent, decentralized hosting."
        },
        {
          question: "How much does token creation cost?",
          answer: "Token creation costs include Solana network fees (typically 0.01-0.02 SOL) plus our platform fee. Free tier includes 5 tokens per month on devnet. Professional plans start at $29/month with unlimited mainnet deployments."
        }
      ]
    },
    {
      title: "Security & Safety",
      icon: <LuShield />,
      color: "from-green-500 to-emerald-500",
      faqs: [
        {
          question: "Is MGF DEV secure?",
          answer: "Yes, security is our top priority. We use military-grade encryption, audited smart contracts, and follow industry best practices. Your private keys never leave your wallet, and all transactions are signed locally."
        },
        {
          question: "Who controls my tokens?",
          answer: "You maintain full control of your tokens. We don't store your private keys or have access to your funds. All token authorities (mint, freeze, update) are assigned to your wallet address by default."
        },
        {
          question: "What happens to my metadata?",
          answer: "Token metadata is stored on IPFS (InterPlanetary File System) for permanent, decentralized storage. This ensures your token information remains accessible even if our platform is offline."
        },
        {
          question: "Can I revoke token authorities?",
          answer: "Yes, you can revoke mint authority, freeze authority, or update authority at any time. This is often done to make tokens immutable and increase community trust."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: <LuMessageCircle />,
      color: "from-orange-500 to-red-500",
      faqs: [
        {
          question: "What wallets are supported?",
          answer: "We support all major Solana wallets including Phantom, Solflare, Sollet, and any wallet compatible with the Solana Wallet Adapter. Simply connect your preferred wallet to get started."
        },
        {
          question: "Why is my transaction failing?",
          answer: "Common reasons include insufficient SOL for fees, network congestion, or wallet connection issues. Ensure you have at least 0.1 SOL for fees and try refreshing your wallet connection."
        },
        {
          question: "How can I verify my token on explorers?",
          answer: "After creation, your token will automatically appear on Solana explorers like Solscan and SolanaFM. The metadata and image may take a few minutes to propagate across all services."
        },
        {
          question: "Do you provide API access?",
          answer: "Yes, Professional and Enterprise plans include API access for automated token creation and management. Documentation and SDKs are available for popular programming languages."
        }
      ]
    }
  ];

  const supportOptions = [
    {
      icon: <LuBook />,
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      action: "View Docs"
    },
    {
      icon: <LuMessageCircle />,
      title: "Live Chat",
      description: "Get instant help from our team",
      action: "Start Chat"
    },
    {
      icon: <LuHelpCircle />,
      title: "Support Tickets",
      description: "Submit detailed technical questions",
      action: "Create Ticket"
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              Help Center
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Find answers to common questions about MGF DEV Token Creator. 
            Can't find what you're looking for? Our support team is here to help.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12 mb-20">
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.title} className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 lg:p-12">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-white`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {category.faqs.length} questions
                  </p>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div
                      key={faq.question}
                      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </h4>
                        <LuChevronDown 
                          className={`w-6 h-6 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <div className={`transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      } overflow-hidden`}>
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Support Options */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 lg:p-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Still Need Help?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any questions or issues.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div key={option.title} className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  {option.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {option.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {option.description}
                </p>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              <1min
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              99.9%
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Issue Resolution</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              5★
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Customer Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};