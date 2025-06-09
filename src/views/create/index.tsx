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
  createCreateMetadataAccountInstruction,
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { FC, useCallback, useState } from "react";
import { notify } from "../../utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";
import { AiOutlineClose } from "react-icons/ai";
import { InputView } from "../index";
import CreateSVG from "../../components/SVG/CreateSVG";
import Branding from "../../components/Branding";

export const CreateView: FC = ({ setOpenCreateModal }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [tokenUri, setTokenUri] = useState("");
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
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        publicKey
      );

      try {
        const metadataUrl = await uploadMetadata(token);
        console.log(metadataUrl);

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
          txid: signature,
        });
      } catch (error: any) {
        notify({ type: "error", message: "Token creation failed" });
      }
      setIsLoading(false);
    },
    [publicKey, connection, sendTransaction]
  );

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = await uploadImagePinata(file);
      setToken({ ...token, image: imgUrl });
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
            pinata_secret_api_key: `
            a8d0bf76f69046e2cf5129f69310387316fbec8fd9730519e71d41df0a503703`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        return ImgHash;
      } catch (error: any) {
        notify({ type: "error", message: "Upload image failed" });
      }
      setIsLoading(false);
    }
  };

  const uploadMetadata = async (token) => {
    setIsLoading(true);
    const { name, symbol, description, image } = token;
    console.log(name, symbol, description, image);
    if (!name || !symbol || !description || !image)
      return console.log("Data Missing");

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
          pinata_secret_api_key: `
          a8d0bf76f69046e2cf5129f69310387316fbec8fd9730519e71d41df0a503703`,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      return url;
    } catch (error: any) {
      notify({ type: "error", message: "Upload failed" });
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
            <ClipLoader color="#8B5CF6" size={50} />
            <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">Creating your token...</p>
          </div>
        </div>
      )}

      {!tokenMintAddress ? (
        <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="w-full max-w-6xl">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Side - Image Upload */}
                <div className="p-8 lg:p-12 bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                  <div className="h-full flex flex-col justify-center">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2">Token Image</h3>
                      <p className="text-purple-100">Upload your token's visual identity</p>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                      {token.image ? (
                        <div className="relative group">
                          <img 
                            src={token.image} 
                            alt="token" 
                            className="w-48 h-48 rounded-2xl object-cover shadow-2xl"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label htmlFor="file" className="cursor-pointer bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
                              Change Image
                            </label>
                          </div>
                        </div>
                      ) : (
                        <label htmlFor="file" className="cursor-pointer">
                          <div className="w-48 h-48 border-2 border-dashed border-white/30 rounded-2xl flex flex-col items-center justify-center hover:border-white/50 transition-colors">
                            <CreateSVG />
                            <span className="mt-4 text-sm font-medium">Click to upload image</span>
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

                    <div className="mt-8">
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        onChange={(e) => handleFormFieldChange("description", e)}
                        className="w-full h-24 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                        placeholder="Describe your token's purpose and utility..."
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 lg:p-12">
                  <div className="h-full flex flex-col">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Create Solana Token
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Fill in the details to create your custom Solana token
                      </p>
                    </div>

                    <div className="flex-1 space-y-6">
                      <InputView
                        name="Token Name"
                        placeholder="Enter token name"
                        clickhandle={(e) => handleFormFieldChange("name", e)}
                      />
                      <InputView
                        name="Symbol"
                        placeholder="Enter token symbol"
                        clickhandle={(e) => handleFormFieldChange("symbol", e)}
                      />
                      <InputView
                        name="Decimals"
                        placeholder="Enter decimals (e.g., 9)"
                        clickhandle={(e) => handleFormFieldChange("decimals", e)}
                      />
                      <InputView
                        name="Supply"
                        placeholder="Enter total supply"
                        clickhandle={(e) => handleFormFieldChange("amount", e)}
                      />

                      <button
                        onClick={() => createToken(token)}
                        disabled={!token.name || !token.symbol || !token.decimals || !token.amount}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                      >
                        Create Token
                      </button>
                    </div>

                    <button
                      onClick={() => setOpenCreateModal(false)}
                      className="mt-6 w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
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
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Token Created Successfully!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your Solana token has been deployed to the blockchain
                  </p>
                </div>

                <div className="mb-8">
                  {token.image && (
                    <img
                      src={token.image}
                      alt="Token"
                      className="w-32 h-32 rounded-2xl object-cover mx-auto shadow-lg"
                    />
                  )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 mb-8">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Token Address
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={tokenMintAddress}
                      readOnly
                      className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white font-mono text-sm"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(tokenMintAddress)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                  >
                    View on Solana Explorer
                  </a>
                  
                  <button
                    onClick={() => setOpenCreateModal(false)}
                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
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