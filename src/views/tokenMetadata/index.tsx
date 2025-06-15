import { FC, useState, useCallback } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { ClipLoader } from "react-spinners";
import { notify } from "../../utils/notifications";
import { InputView } from "../index";
import { LuSearch, LuFileText, LuExternalLink, LuCopy, LuRefreshCw } from "react-icons/lu";

export const ToeknMetadata: FC = ({ setOpenTokenMetaData }) => {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState(null);
  const [logo, setLogo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMetadata = useCallback(
    async (address) => {
      if (!address) {
        notify({ type: "error", message: "Please enter a token address" });
        return;
      }

      setIsLoading(true);
      try {
        const tokenMint = new PublicKey(address);
        const metadataPDA = PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            tokenMint.toBuffer(),
          ],
          PROGRAM_ID
        )[0];

        const metadataAccount = await connection.getAccountInfo(metadataPDA);
        
        if (!metadataAccount) {
          throw new Error("No metadata found for this token");
        }

        const [metadata] = await Metadata.deserialize(metadataAccount.data);

        let logoImage = null;
        if (metadata.data.uri) {
          try {
            const logoRes = await fetch(metadata.data.uri);
            const logoJson = await logoRes.json();
            logoImage = logoJson.image;
          } catch (error) {
            console.warn("Could not fetch token image:", error);
          }
        }

        setTokenMetadata(metadata.data);
        setLogo(logoImage);
        setLoaded(true);
        setTokenAddress("");
        
        notify({
          type: "success",
          message: "Metadata retrieved successfully",
          description: `Found metadata for ${metadata.data.name}`
        });
      } catch (error: any) {
        notify({ 
          type: "error", 
          message: "Failed to fetch token metadata",
          description: error?.message || "Please check the token address and try again"
        });
      }
      setIsLoading(false);
    },
    [connection]
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notify({
      type: "success",
      message: "Copied to clipboard!",
      description: "Text has been copied to your clipboard."
    });
  };

  const resetSearch = () => {
    setLoaded(false);
    setTokenMetadata(null);
    setLogo(null);
    setTokenAddress("");
  };

  const features = [
    {
      icon: <LuFileText />,
      title: "Complete Metadata",
      description: "View all token information including name, symbol, and description"
    },
    {
      icon: <LuSearch />,
      title: "On-Chain Verification",
      description: "All data is verified directly from the Solana blockchain"
    },
    {
      icon: <LuExternalLink />,
      title: "IPFS Integration",
      description: "Access decentralized metadata stored on IPFS"
    }
  ];

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl text-center">
            <ClipLoader color="#8B5CF6" size={50} />
            <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
              Fetching token metadata...
            </p>
          </div>
        </div>
      )}

      <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-6xl">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Branding */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <div className="h-full flex flex-col justify-center">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <LuFileText className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Token Metadata Explorer</h3>
                    <p className="text-indigo-100 text-lg">
                      Explore comprehensive token information and metadata stored on the Solana blockchain
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
                          <p className="text-sm text-indigo-100">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                    <h4 className="font-semibold mb-2">What is Token Metadata?</h4>
                    <p className="text-sm text-indigo-100">
                      Token metadata contains essential information like name, symbol, description, 
                      and visual assets. All data is stored on-chain and can be independently verified.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Metadata Interface */}
              <div className="p-8 lg:p-12">
                <div className="h-full flex flex-col justify-center">
                  {!loaded ? (
                    <>
                      <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                          Explore Token Metadata
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                          Enter a Solana token address to view its complete metadata
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <InputView
                            name="Token Address"
                            placeholder="Enter Solana token mint address"
                            clickhandle={(e) => setTokenAddress(e.target.value)}
                          />
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Example: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
                          </p>
                        </div>

                        <button
                          onClick={() => getMetadata(tokenAddress)}
                          disabled={!tokenAddress}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                          <LuSearch className="w-5 h-5" />
                          Get Token Metadata
                        </button>

                        <button
                          onClick={() => setOpenTokenMetaData(false)}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                          Token Information
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                          Metadata retrieved and verified from blockchain
                        </p>
                      </div>

                      {/* Token Display */}
                      {logo && (
                        <div className="flex justify-center mb-8">
                          <img 
                            src={logo} 
                            alt="Token Logo" 
                            className="w-32 h-32 rounded-3xl object-cover shadow-lg"
                          />
                        </div>
                      )}

                      {/* Metadata Fields */}
                      <div className="space-y-4 mb-8">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Token Name
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={tokenMetadata?.name || "N/A"}
                              readOnly
                              className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white"
                            />
                            <button
                              onClick={() => copyToClipboard(tokenMetadata?.name || "")}
                              className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
                            >
                              <LuCopy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Symbol
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={tokenMetadata?.symbol || "N/A"}
                              readOnly
                              className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white"
                            />
                            <button
                              onClick={() => copyToClipboard(tokenMetadata?.symbol || "")}
                              className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
                            >
                              <LuCopy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Metadata URI
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={tokenMetadata?.uri || "N/A"}
                              readOnly
                              className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm"
                            />
                            <button
                              onClick={() => copyToClipboard(tokenMetadata?.uri || "")}
                              className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
                            >
                              <LuCopy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-4">
                        {tokenMetadata?.uri && (
                          <a
                            href={tokenMetadata.uri}
                            target="_blank"
                            rel="noreferrer"
                            className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-center"
                          >
                            <div className="flex items-center justify-center gap-3">
                              <LuExternalLink className="w-5 h-5" />
                              View Metadata URI
                            </div>
                          </a>
                        )}

                        <button
                          onClick={resetSearch}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2"
                        >
                          <LuRefreshCw className="w-4 h-4" />
                          Search Another Token
                        </button>

                        <button
                          onClick={() => setOpenTokenMetaData(false)}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};