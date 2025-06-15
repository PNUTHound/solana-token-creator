import { FC, useEffect, useCallback } from "react";
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";
import { notify } from "../../utils/notifications";
import { LuGift, LuShield, LuZap, LuUsers } from "react-icons/lu";

export const AirdropView: FC = ({ setOpenAirdrop }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({
        type: "error",
        message: "Wallet not connected!",
        description: "Please connect your wallet to request an airdrop.",
      });
      return;
    }

    let signature: TransactionSignature = "";

    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      notify({
        type: "success",
        message: "Airdrop successful!",
        description: "1 SOL has been added to your wallet.",
        txid: signature,
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature,
      });

      getUserSOLBalance(publicKey, connection);
    } catch (error: any) {
      notify({
        type: "error",
        message: `Airdrop failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log("error", `Airdrop failed! ${error?.message}`, signature);
    }
  }, [publicKey, connection, getUserSOLBalance]);

  const features = [
    {
      icon: <LuGift />,
      title: "Free SOL Tokens",
      description: "Get 1 SOL instantly for testing and development"
    },
    {
      icon: <LuZap />,
      title: "Instant Delivery",
      description: "Tokens delivered to your wallet in seconds"
    },
    {
      icon: <LuShield />,
      title: "Secure Process",
      description: "Safe and verified airdrop mechanism"
    },
    {
      icon: <LuUsers />,
      title: "Developer Friendly",
      description: "Perfect for testing and development needs"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-6xl">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Branding */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <div className="h-full flex flex-col justify-center">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <LuGift className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Free SOL Airdrop</h3>
                  <p className="text-blue-100 text-lg">Get free SOL tokens for testing and development on Solana networks</p>
                </div>
                
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-blue-100">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <h4 className="font-semibold mb-2">Important Note</h4>
                  <p className="text-sm text-blue-100">
                    Airdrop tokens are for development and testing purposes only. 
                    They have no real-world value and are only available on devnet and testnet.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Airdrop Interface */}
            <div className="p-8 lg:p-12">
              <div className="h-full flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Request SOL Airdrop
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Get 1 SOL token instantly for testing your applications
                  </p>
                </div>

                {/* Balance Display */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8 mb-8">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                      Current Wallet Balance
                    </p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {wallet.publicKey ? (balance || 0).toLocaleString() : "0"} SOL
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {wallet.publicKey ? "Connected" : "Wallet not connected"}
                    </p>
                  </div>
                </div>

                {/* Airdrop Button */}
                <div className="space-y-4">
                  <button
                    onClick={onClick}
                    disabled={!publicKey}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
                  >
                    {!publicKey ? "Connect Wallet to Continue" : "Request 1 SOL Airdrop"}
                  </button>

                  <button
                    onClick={() => setOpenAirdrop(false)}
                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors"
                  >
                    Close
                  </button>
                </div>

                {/* Network Info */}
                <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-900 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                        Network Requirements
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Airdrops are only available on devnet and testnet networks. 
                        Make sure your wallet is connected to the correct network before requesting.
                      </p>
                    </div>
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