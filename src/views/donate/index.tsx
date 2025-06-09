import { FC, useEffect, useCallback, useState } from "react";
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { notify } from "../../utils/notifications";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { InputView } from "../index";

export const DonateView: FC = ({ setOpenSendTransaction }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("0.0");

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const handleFormFieldChange = (fieldName, e) => {
    setAmount(e.target.value);
  };

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      console.log("error", `Send Transaction: Wallet not connected!`);
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
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log("error", `Transaction failed! ${error?.message}`, signature);
      return;
    }
  }, [publicKey, amount, sendTransaction, connection]);

  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-4xl">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Branding */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-green-500 to-blue-600 text-white">
              <div className="h-full flex flex-col justify-center text-center">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Support MGF DEV</h3>
                  <p className="text-green-100">Send SOL to support our development</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Secure Transfer</h4>
                    <p className="text-sm text-green-100">
                      All transactions are processed securely on the Solana blockchain.
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Instant Processing</h4>
                    <p className="text-sm text-green-100">
                      Transactions are confirmed within seconds on Solana's fast network.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Transfer Interface */}
            <div className="p-8 lg:p-12">
              <div className="h-full flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Send SOL
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Transfer SOL tokens securely
                  </p>
                </div>

                {/* Balance Display */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 mb-8">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                      Available Balance
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {wallet.publicKey ? (balance || 0).toLocaleString() : "0"} SOL
                    </p>
                  </div>
                </div>

                {/* Transfer Form */}
                <div className="space-y-6">
                  <InputView
                    name="Amount (SOL)"
                    placeholder="Enter amount to send"
                    clickhandle={(e) => handleFormFieldChange("amount", e)}
                  />

                  <button
                    onClick={onClick}
                    disabled={!publicKey || !amount || Number(amount) <= 0}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                  >
                    {!publicKey ? "Connect Wallet First" : "Send SOL"}
                  </button>

                  <button
                    onClick={() => setOpenSendTransaction(false)}
                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {/* Info */}
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Recipient:</strong> MGF DEV Development Fund<br/>
                    Your contribution helps us build better tools for the Solana ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};