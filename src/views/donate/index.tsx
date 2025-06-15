import { FC, useEffect, useCallback, useState } from "react";
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { notify } from "../../utils/notifications";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { InputView } from "../index";
import { LuHeart, LuShield, LuZap, LuUsers, LuSend } from "react-icons/lu";

export const DonateView: FC = ({ setOpenSendTransaction }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("");

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const handleFormFieldChange = (fieldName, e) => {
    setAmount(e.target.value);
  };

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ 
        type: "error", 
        message: `Wallet not connected!`,
        description: "Please connect your wallet to send SOL."
      });
      return;
    }

    if (!amount || Number(amount) <= 0) {
      notify({ 
        type: "error", 
        message: `Invalid amount!`,
        description: "Please enter a valid amount to send."
      });
      return;
    }

    const creatorAddress = new PublicKey(
      "FUzVBZ3bxikuDNuNX1fY6BbCd9AFPazND25skH3yEPcz"
    );
    let signature: TransactionSignature = "";

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: creatorAddress,
          lamports: LAMPORTS_PER_SOL * Number(amount),
        })
      );

      signature = await sendTransaction(transaction, connection);

      notify({
        type: "success",
        message: "Transaction successful!",
        description: `Successfully sent ${amount} SOL to MGF DEV.`,
        txid: signature,
      });

      // Update balance after successful transaction
      setTimeout(() => {
        getUserSOLBalance(publicKey, connection);
      }, 2000);

    } catch (error: any) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error?.message || "Please try again.",
        txid: signature,
      });
    }
  }, [publicKey, amount, sendTransaction, connection, getUserSOLBalance]);

  const features = [
    {
      icon: <LuHeart />,
      title: "Support Development",
      description: "Help us build better tools for the Solana ecosystem"
    },
    {
      icon: <LuShield />,
      title: "Secure Transfer",
      description: "All transactions are processed securely on-chain"
    },
    {
      icon: <LuZap />,
      title: "Instant Processing",
      description: "Transactions confirmed within seconds"
    },
    {
      icon: <LuUsers />,
      title: "Community Driven",
      description: "Supporting the future of decentralized development"
    }
  ];

  const presetAmounts = ["0.1", "0.5", "1.0", "2.0"];

  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-6xl">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Branding */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-green-500 to-blue-600 text-white">
              <div className="h-full flex flex-col justify-center">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <LuHeart className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Support MGF DEV</h3>
                  <p className="text-green-100 text-lg">
                    Help us continue building innovative tools for the Solana ecosystem. 
                    Your support enables us to create better developer experiences.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-green-100">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <h4 className="font-semibold mb-2">MGF DEV Mission</h4>
                  <p className="text-sm text-green-100">
                    Building the future of Solana development with user-friendly tools, 
                    comprehensive documentation, and community-driven innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Transfer Interface */}
            <div className="p-8 lg:p-12">
              <div className="h-full flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Send SOL Support
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Transfer SOL tokens securely to support our development
                  </p>
                </div>

                {/* Balance Display */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-6 mb-8">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                      Available Wallet Balance
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {wallet.publicKey ? (balance || 0).toLocaleString() : "0"} SOL
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {wallet.publicKey ? "Wallet Connected" : "Connect wallet to view balance"}
                    </p>
                  </div>
                </div>

                {/* Transfer Form */}
                <div className="space-y-6">
                  <div>
                    <InputView
                      name="Amount (SOL)"
                      placeholder="Enter amount to send"
                      clickhandle={(e) => handleFormFieldChange("amount", e)}
                    />
                    
                    {/* Preset Amounts */}
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick amounts:</p>
                      <div className="flex gap-2">
                        {presetAmounts.map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setAmount(preset)}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg transition-colors"
                          >
                            {preset} SOL
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onClick}
                    disabled={!publicKey || !amount || Number(amount) <= 0}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <LuSend className="w-5 h-5" />
                    {!publicKey ? "Connect Wallet First" : "Send SOL Support"}
                  </button>

                  <button
                    onClick={() => setOpenSendTransaction(false)}
                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {/* Recipient Info */}
                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Recipient: MGF DEV Development Fund
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 font-mono break-all">
                      FUzVBZ3bxikuDNuNX1fY6BbCd9AFPazND25skH3yEPcz
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                      Your contribution helps us build better tools for the Solana ecosystem
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};