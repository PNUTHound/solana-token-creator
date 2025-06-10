import { FC, useState } from "react";
import { LuChevronDown, LuHelpCircle } from "react-icons/lu";

export const FaqView: FC = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What is MGF DEV Token Creator?",
      answer: "MGF DEV Token Creator is a comprehensive platform for creating, deploying, and managing Solana tokens without any coding knowledge. Our platform provides professional-grade tools for developers, creators, and businesses.",
      id: "faq-1",
    },
    {
      question: "How much does it cost to create a token?",
      answer: "Creating a token requires only the network fees for deploying to the Solana blockchain. Our platform is free to use, you only pay the minimal Solana transaction fees which are typically less than $0.01.",
      id: "faq-2",
    },
    {
      question: "Do I need coding experience to create tokens?",
      answer: "No coding experience is required! Our intuitive interface allows anyone to create professional Solana tokens. Simply fill in your token details, upload an image, and deploy with one click.",
      id: "faq-3",
    },
    {
      question: "What networks are supported?",
      answer: "We support Solana mainnet, devnet, and testnet. You can easily switch between networks using our network selector. We recommend testing on devnet before deploying to mainnet.",
      id: "faq-4",
    },
    {
      question: "Can I update my token metadata after creation?",
      answer: "Token metadata can be updated if you maintain update authority during creation. Our platform provides tools to view and analyze token metadata, and update it when possible.",
      id: "faq-5",
    },
    {
      question: "Is my wallet secure when using MGF DEV?",
      answer: "Yes, we use industry-standard wallet adapters and never store your private keys. All transactions are signed locally in your wallet, ensuring maximum security for your assets.",
      id: "faq-6",
    },
    {
      question: "What file formats are supported for token images?",
      answer: "We support all common image formats including PNG, JPG, JPEG, GIF, and SVG. Images are automatically optimized and stored on IPFS for decentralized access.",
      id: "faq-7",
    },
    {
      question: "How can I get support if I need help?",
      answer: "We offer 24/7 community support through our contact form, documentation, and community channels. Our team is always ready to help you succeed with your token projects.",
      id: "faq-8",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full mb-6">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Got Questions?
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              We Have Answers
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about MGF DEV Token Creator. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                      <LuHelpCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <LuChevronDown 
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <div className="pl-14">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you succeed with your token creation journey.
            </p>
            <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};