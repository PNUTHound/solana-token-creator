import { FC, useState, useCallback } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { ClipLoader } from "react-spinners";
import { notify } from "../../utils/notifications";
import { InputView } from "../index";

export const ToeknMetadata: FC = ({ setOpenTokenMetaData }) => {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState(null);
  const [logo, setLogo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMetadata = useCallback(
    async (form) => {
      setIsLoading(true);
      try {
        const tokenMint = new PublicKey(form);
        const metadataPDA = PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            tokenMint.toBuffer(),
          ],
          PROGRAM_ID
        )[0];

        const metadataAccount = await connection.getAccountInfo(metadataPDA);
        const [metadata, _] = await Metadata.deserialize(metadataAccount.data);

        let logoRes = await fetch(metadata.data.uri);
        let logoJson = await logoRes.json();
        let { image } = logoJson;

        setTokenMetadata({ tokenMetadata, ...metadata.data });
        setLogo(image);
        setIsLoading(false);
        setLoaded(true);
        setTokenAddress("");
        notify({
          type: "success",
          message: " Successful fetch token metadata",
        });
        console.log("Successful fetch token metadata");
      } catch (error: any) {
        notify({ type: "error", message: "Token Metadata failed" });
        setIsLoading(false);
      }
    },
    [tokenAddress]
  );

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
            <ClipLoader color="#8B5CF6" size={50} />
            <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">Fetching metadata...</p>
          </div>
        </div>
      )}

      <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-4xl">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Branding */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <div className="h-full flex flex-col justify-center text-center">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Token Metadata</h3>
                    <p className="text-indigo-100">Explore token information and metadata</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-semibold mb-2">What is Metadata?</h4>
                      <p className="text-sm text-indigo-100">
                        Token metadata contains information like name, symbol, description, and image.
                      </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-semibold mb-2">On-Chain Data</h4>
                      <p className="text-sm text-indigo-100">
                        All metadata is stored on-chain and can be verified independently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Metadata Interface */}
              <div className="p-8 lg:p-12">
                <div className="h-full flex flex-col justify-center">
                  {!loaded ? (
                    <>
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          Get Token Metadata
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Enter a token address to view its metadata
                        </p>
                      </div>

                      <div className="space-y-6">
                        <InputView
                          name="Token Address"
                          placeholder="Enter Solana token address"
                          clickhandle={(e) => setTokenAddress(e.target.value)}
                        />

                        <button
                          onClick={() => getMetadata(tokenAddress)}
                          disabled={!tokenAddress}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                        >
                          Get Metadata
                        </button>

                        <button
                          onClick={() => setOpenTokenMetaData(false)}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          Token Information
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Metadata retrieved successfully
                        </p>
                      </div>

                      {logo && (
                        <div className="flex justify-center mb-8">
                          <img 
                            src={logo} 
                            alt="Token Logo" 
                            className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                          />
                        </div>
                      )}

                      <div className="space-y-4 mb-8">
                        <InputView
                          name="Token Name"
                          placeholder={tokenMetadata?.name || "N/A"}
                        />
                        <InputView
                          name="Symbol"
                          placeholder={tokenMetadata?.symbol || "N/A"}
                        />
                        <InputView
                          name="Token URI"
                          placeholder={tokenMetadata?.uri || "N/A"}
                        />
                      </div>

                      <div className="space-y-4">
                        <a
                          href={tokenMetadata?.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-center"
                        >
                          View Metadata URI
                        </a>

                        <button
                          onClick={() => {
                            setLoaded(false);
                            setTokenMetadata(null);
                            setLogo(null);
                          }}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
                        >
                          Search Another Token
                        </button>

                        <button
                          onClick={() => setOpenTokenMetaData(false)}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
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