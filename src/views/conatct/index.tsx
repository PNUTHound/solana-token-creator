import { FC } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { LuMail, LuMapPin, LuClock, LuMessageCircle, LuSend, LuCheckCircle } from "react-icons/lu";

export const ContactView: FC = ({ setOpenContact }) => {
  const [state, handleSubmit] = useForm("mzbnzpqr");
  
  if (state.succeeded) {
    return (
      <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-2xl text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <LuCheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Message Sent Successfully!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Thank you for reaching out to MGF DEV. Our team will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setOpenContact(false)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Close
            </button>
          </div>
        </div>
      </section>
    );
  }

  const contactInfo = [
    {
      icon: <LuMail />,
      title: "Email Support",
      description: "contact@mgfdev.com",
      detail: "Get expert help from our team"
    },
    {
      icon: <LuMapPin />,
      title: "Global Team",
      description: "Remote Worldwide",
      detail: "Serving developers globally"
    },
    {
      icon: <LuClock />,
      title: "Response Time",
      description: "< 24 hours",
      detail: "Fast and reliable support"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-6xl">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Contact Info */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <div className="h-full flex flex-col justify-center">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <LuMessageCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
                  <p className="text-blue-100 text-lg">
                    Have questions about MGF DEV? We'd love to hear from you. 
                    Send us a message and we'll respond as soon as possible.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{info.title}</h4>
                        <p className="text-blue-100 font-medium">{info.description}</p>
                        <p className="text-sm text-blue-200">{info.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <h4 className="font-semibold mb-2">MGF DEV Team</h4>
                  <p className="text-sm text-blue-100">
                    Building the future of Solana development tools with innovative, 
                    user-friendly solutions for developers and creators worldwide.
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    {["Twitter", "Discord", "GitHub", "Telegram"].map((platform) => (
                      <button
                        key={platform}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <span className="text-xs font-medium">{platform[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="p-8 lg:p-12">
              <div className="h-full flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Fill out the form below and our team will get back to you promptly
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about your project, question, or how we can help..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      {state.submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <LuSend className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpenContact(false)}
                      className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};