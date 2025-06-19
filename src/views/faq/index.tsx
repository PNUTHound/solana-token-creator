import { FC, useState } from "react";
import { 
  LuChevronDown, 
  LuHelpCircle, 
  LuMessageCircle, 
  LuMail, 
  LuPhone, 
  LuClock,
  LuShield,
  LuZap,
  LuUsers,
  LuCode,
  LuStar,
  LuCheckCircle
} from "react-icons/lu";

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
      icon: <LuCode />,
      color: "from-blue-500 to-cyan-500",
      faqs: [
        {
          question: "How do I create my first Solana token?",
          answer: "Creating your first token is simple! Click on 'Create Token' in our tools section, fill in your token details (name, symbol, supply, etc.), upload an image, and deploy instantly. The entire process takes less than 2 minutes."
        },
        {
          question: "Do I need coding experience to use MGF DEV?",
          answer: "Not at all! MGF DEV is designed as a no-code platform. Our intuitive interface allows anyone to create professional Solana tokens without any programming knowledge. Just fill in the forms and we handle all the technical complexity."
        },
        {
          question: "What networks does MGF DEV support?",
          answer: "We support all Solana networks including Mainnet, Devnet, and Testnet. You can easily switch between networks using our network selector. We recommend starting with Devnet for testing before deploying to Mainnet."
        },
        {
          question: "How much does it cost to create a token?",
          answer: "Token creation costs vary by network. On Devnet it's free for testing. On Mainnet, you'll pay standard Solana transaction fees (typically under $0.01) plus any SOL required for rent exemption (around 0.00203 SOL)."
        }
      ]
    },
    {
      title: "Token Management",
      icon: <LuShield />,
      color: "from-purple-500 to-pink-500",
      faqs: [
        {
          question: "Can I update my token metadata after creation?",
          answer: "Yes, if you maintain update authority during token creation, you can modify metadata like name, symbol, description, and image. However, some properties like total supply and decimals cannot be changed after deployment."
        },
        {
          question: "How do I add liquidity to my token?",
          answer: "After creating your token, you can add liquidity on decentralized exchanges like Raydium or Orca. You'll need to create a liquidity pool by pairing your token with SOL or USDC. We provide guides for this process."
        },
        {
          question: "What is freeze authority and should I use it?",
          answer: "Freeze authority allows you to freeze individual token accounts, preventing transfers. This can be useful for compliance or security but may reduce trust. Consider your use case carefully before enabling this feature."
        },
        {
          question: "How do I verify my token is legitimate?",
          answer: "Legitimate tokens have verified metadata, clear project information, and transparent team details. You can verify tokens using our metadata explorer or check them on Solana Explorer for on-chain verification."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: <LuZap />,
      color: "from-green-500 to-emerald-500",
      faqs: [
        {
          question: "Why is my transaction failing?",
          answer: "Common causes include insufficient SOL for fees, network congestion, or incorrect parameters. Ensure you have at least 0.01 SOL for fees and try again. If issues persist, contact our support team with your transaction signature."
        },
        {
          question: "How long does token deployment take?",
          answer: "Token deployment typically takes 10-30 seconds on Solana. The process includes creating the mint account, setting metadata, and confirming the transaction. Network congestion may occasionally cause delays."
        },
        {
          question: "Can I recover a failed transaction?",
          answer: "Failed transactions don't consume your tokens but may consume SOL fees. Check the transaction on Solana Explorer for details. If the failure was due to our platform, contact support for assistance."
        },
        {
          question: "What wallets are supported?",
          answer: "We support all major Solana wallets including Phantom, Solflare, Sollet, and any wallet compatible with the Solana Wallet Adapter. Mobile wallets are also supported through WalletConnect."
        }
      ]
    },
    {
      title: "Security & Best Practices",
      icon: <LuUsers />,
      color: "from-orange-500 to-red-500",
      faqs: [
        {
          question: "How secure is the token creation process?",
          answer: "Our platform uses audited smart contracts and follows Solana security best practices. All transactions are signed by your wallet, ensuring you maintain full control. We never store your private keys or have access to your funds."
        },
        {
          question: "What should I do before launching on Mainnet?",
          answer: "Always test thoroughly on Devnet first. Verify all metadata, test transfers, and ensure your tokenomics are correct. Have your marketing materials ready and consider getting a security audit for complex projects."
        },
        {
          question: "How do I protect against rug pulls?",
          answer: "Use reputable platforms, verify team credentials, check for locked liquidity, review smart contracts, and be cautious of projects promising unrealistic returns. Our platform provides transparency tools to help with due diligence."
        },
        {
          question: "What are the legal considerations?",
          answer: "Token creation may have legal implications depending on your jurisdiction and use case. Consult with legal professionals familiar with cryptocurrency regulations in your area before launching any token project."
        }
      ]
    }
  ];

  const supportOptions = [
    {
      icon: <LuMail />,
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "support@mgfdev.com",
      responseTime: "< 24 hours"
    },
    {
      icon: <LuMessageCircle />,
      title: "Live Chat",
      description: "Instant help from our team",
      contact: "Available 24/7",
      responseTime: "< 5 minutes"
    },
    {
      icon: <LuPhone />,
      title: "Community Discord",
      description: "Join our developer community",
      contact: "discord.gg/mgfdev",
      responseTime: "Real-time"
    }
  ];

  const stats = [
    { number: "500+", label: "Questions Answered Daily" },
    { number: "99%", label: "Customer Satisfaction" },
    { number: "< 2h", label: "Average Response Time" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-8">
            <LuHelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
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
            Find answers to common questions about MGF DEV's Solana token creation platform. 
            Can't find what you're looking for? Our support team is here to help.
          </p>
        </div>

        {/* Support Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12 mb-20">
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.title} className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div
                      key={faqIndex}
                      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </span>
                        <LuChevronDown 
                          className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <div className={`transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      } overflow-hidden`}>
                        <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
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

        {/* Support Options */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 lg:p-16 mb-20">
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
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {option.description}
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-purple-600 dark:text-purple-400">
                    {option.contact}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <LuClock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {option.responseTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Quick Tips for Success
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Always test on Devnet first",
              "Keep your private keys secure",
              "Verify all details before deployment",
              "Join our community for updates"
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <LuCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {tip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};