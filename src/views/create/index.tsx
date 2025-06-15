import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { FC, useCallback, useState } from "react";
import { notify } from "../../utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import { InputView } from "../index";
import { LuUpload, LuImage, LuCheckCircle, LuCopy, LuExternalLink } from "react-icons/lu";

export const CreateView: FC = ({ setOpenCreateModal }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: "",
    amount: "",
    image: "",
    description: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setToken({ ...token, [fieldName]: e.target.value });
  };

  const createToken = useCallback(
    async (token) => {
      setIsLoading(true);
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        publicKey
      );

      try {
        const metadataUrl = await uploadMetadata(token);

        const createMetadataInstruction =
          createCreateMetadataAccountV3Instruction(
            {
              metadata: PublicKey.findProgramAddressSync(
                [
                  Buffer.from("metadata"),
                  PROGRAM_ID.toBuffer(),
                  mintKeypair.publicKey.toBuffer(),
                ],
                PROGRAM_ID
              )[0],
              mint: mintKeypair.publicKey,
              mintAuthority: publicKey,
              payer: publicKey,
              updateAuthority: publicKey,
            },
            {
              createMetadataAccountArgsV3: {
                data: {
                  name: token.name,
                  symbol: token.symbol,
                  uri: metadataUrl,
                  creators: null,
                  sellerFeeBasisPoints: 0,
                  uses: null,
                  collection: null,
                },
                isMutable: false,
                collectionDetails: null,
              },
            }
          );

        const createNewTokenTransaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMintInstruction(
            mintKeypair.publicKey,
            Number(token.decimals),
            publicKey,
            publicKey,
            TOKEN_PROGRAM_ID
          ),
          createAssociatedTokenAccountInstruction(
            publicKey,
            tokenATA,
            publicKey,
            mintKeypair.publicKey
          ),
          createMintToInstruction(
            mintKeypair.publicKey,
            tokenATA,
            publicKey,
            Number(token.amount) * Math.pow(10, Number(token.decimals))
          ),
          createMetadataInstruction
        );

        const signature = await sendTransaction(
          createNewTokenTransaction,
          connection,
          {
            signers: [mintKeypair],
          }
        );

        setTokenMintAddress(mintKeypair.publicKey.toString());
        notify({
          type: "success",
          message: "Token creation successful",
          description: "Your Solana token has been deployed successfully!",
          txid: signature,
        });
      } catch (error: any) {
        notify({ 
          type: "error", 
          message: "Token creation failed",
          description: error?.message || "Please try again"
        });
      }
      setIsLoading(false);
    },
    [publicKey, connection, sendTransaction]
  );

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      const imgUrl = await uploadImagePinata(file);
      setToken({ ...token, image: imgUrl });
      setIsLoading(false);
    }
  };

  const uploadImagePinata = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `81eb45ae14d1d1884921`,
            pinata_secret_api_key: `a8d0bf76f69046e2cf5129f69310387316fbec8fd9730519e71d41df0a503703`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        return ImgHash;
      } catch (error: any) {
        notify({ type: "error", message: "Upload image failed" });
      }
    }
  };

  const uploadMetadata = async (token) => {
    const { name, symbol, description, image } = token;
    if (!name || !symbol || !description || !image) {
      throw new Error("Missing required token information");
    }

    const data = JSON.stringify({
      name: name,
      symbol: symbol,
      description: description,
      image: image,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `81eb45ae14d1d1884921`,
          pinata_secret_api_key: `a8d0bf76f69046e2cf5129f69310387316fbec8fd9730519e71d41df0a503703`,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      return url;
    } catch (error: any) {
      throw new Error("Failed to upload metadata");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notify({
      type: "success",
      message: "Copied to clipboard!",
      description: "Token address has been copied to your clipboard."
    });
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl text-center">
            <ClipLoader color="#8B5CF6" size={50} />
            <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
              {token.image ? "Creating your token..." : "Uploading image..."}
            </p>
          </div>
        </div>
      )}

      {!tokenMintAddress ? (
        <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="w-full max-w-6xl">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Side - Image Upload & Description */}
                <div className="p-8 lg:p-12 bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                  <div className="h-full flex flex-col justify-center">
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold mb-4">Token Visual Identity</h3>
                      <p className="text-purple-100 text-lg">Upload your token's image and description</p>
                    </div>
                    
                    {/* Image Upload */}
                    <div className="flex-1 flex items-center justify-center mb-8">
                      {token.image ? (
                        <div className="relative group">
                          <img 
                            src={token.image} 
                            alt="token" 
                            className="w-56 h-56 rounded-3xl object-cover shadow-2xl"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label htmlFor="file" className="cursor-pointer bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                              Change Image
                            </label>
                          </div>
                        </div>
                      ) : (
                        <label htmlFor="file" className="cursor-pointer">
                          <div className="w-56 h-56 border-2 border-dashed border-white/30 rounded-3xl flex flex-col items-center justify-center hover:border-white/50 transition-colors group">
                            <LuUpload className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                            <span className="text-lg font-medium mb-2">Upload Token Image</span>
                            <span className="text-sm text-purple-200">PNG, JPG, GIF up to 10MB</span>
                          </div>
                        </label>
                      )}
                      <input
                        id="file"
                        onChange={handleImageChange}
                        type="file"
                        className="hidden"
                        accept="image/*"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-lg font-semibold mb-3">Token Description</label>
                      <textarea
                        onChange={(e) => handleFormFieldChange("description", e)}
                        className="w-full h-32 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                        placeholder="Describe your token's purpose, utility, and unique features..."
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side - Token Details Form */}
                <div className="p-8 lg:p-12">
                  <div className="h-full flex flex-col">
                    <div className="mb-8">
                      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Create Solana Token
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Fill in the details to create your professional Solana token
                      </p>
                    </div>

                    <div className="flex-1 space-y-6">
                      <InputView
                        name="Token Name"
                        placeholder="e.g., My Awesome Token"
                        clickhandle={(e) => handleFormFieldChange("name", e)}
                      />
                      <InputView
                        name="Symbol"
                        placeholder="e.g., MAT (3-5 characters)"
                        clickhandle={(e) => handleFormFieldChange("symbol", e)}
                      />
                      <InputView
                        name="Decimals"
                        placeholder="e.g., 9 (recommended)"
                        clickhandle={(e) => handleFormFieldChange("decimals", e)}
                      />
                      <InputView
                        name="Total Supply"
                        placeholder="e.g., 1000000"
                        clickhandle={(e) => handleFormFieldChange("amount", e)}
                      />

                      {/* Requirements Check */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h4>
                        <div className="space-y-2">
                          {[
                            { label: "Token Name", value: token.name },
                            { label: "Symbol", value: token.symbol },
                            { label: "Decimals", value: token.decimals },
                            { label: "Supply", value: token.amount },
                            { label: "Image", value: token.image },
                            { label: "Description", value: token.description }
                          ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2">
                              <LuCheckCircle className={`w-4 h-4 ${item.value ? 'text-green-500' : 'text-gray-300'}`} />
                              <span className={`text-sm ${item.value ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => createToken(token)}
                        disabled={!token.name || !token.symbol || !token.decimals || !token.amount || !token.image || !token.description}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
                      >
                        Create Token
                      </button>
                    </div>

                    <button
                      onClick={() => setOpenCreateModal(false)}
                      className="mt-6 w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="w-full max-w-4xl">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="p-8 lg:p-12 text-center">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <LuCheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Token Created Successfully!
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Your Solana token has been deployed to the blockchain
                  </p>
                </div>

                {/* Token Display */}
                <div className="mb-8">
                  {token.image && (
                    <img
                      src={token.image}
                      alt="Token"
                      className="w-40 h-40 rounded-3xl object-cover mx-auto shadow-lg mb-6"
                    />
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {token.name} ({token.symbol})
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Supply: {Number(token.amount).toLocaleString()} tokens
                  </p>
                </div>

                {/* Token Address */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 mb-8">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Token Contract Address
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={tokenMintAddress}
                      readOnly
                      className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(tokenMintAddress)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <LuCopy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <a
                    href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <LuExternalLink className="w-5 h-5" />
                      View on Solana Explorer
                    </div>
                  </a>
                  
                  <button
                    onClick={() => setOpenCreateModal(false)}
                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};