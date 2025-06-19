import { FC, useCallback, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, PublicKey } from "@solana/web3.js";
import {
  DataV2,
  createUpdateMetadataAccountV2Instruction,
  PROGRAM_ID,
  Metadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { ClipLoader } from "react-spinners";
import { notify } from "../../utils/notifications";
import { InputView } from "../index";
import axios from "axios";
import { LuEdit, LuUpload, LuImage, LuCheckCircle, LuCopy, LuExternalLink, LuRefreshCw, LuSave } from "react-icons/lu";

export const UpdateMetadataView: FC = ({ setOpenUpdateMetadata }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Input token, 2: Edit metadata, 3: Success
  const [tokenAddress, setTokenAddress] = useState("");
  const [currentMetadata, setCurrentMetadata] = useState(null);
  const [updatedSignature, setUpdatedSignature] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    image: "",
    uri: ""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const fetchCurrentMetadata = useCallback(async () => {
    if (!tokenAddress) {
      notify({ type: "error", message: "Please enter a token address" });
      return;
    }

    setIsLoading(true);
    try {
      const tokenMint = new PublicKey(tokenAddress);
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

      // Fetch additional metadata from URI if available
      let additionalMetadata = {};
      if (metadata.data.uri) {
        try {
          const response = await fetch(metadata.data.uri);
          additionalMetadata = await response.json();
        } catch (error) {
          console.warn("Could not fetch additional metadata:", error);
        }
      }

      setCurrentMetadata({
        ...metadata.data,
        ...additionalMetadata
      });

      setFormData({
        name: metadata.data.name || "",
        symbol: metadata.data.symbol || "",
        description: additionalMetadata.description || "",
        image: additionalMetadata.image || "",
        uri: metadata.data.uri || ""
      });

      setStep(2);
      notify({
        type: "success",
        message: "Metadata loaded successfully",
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
  }, [connection, tokenAddress]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        const imgUrl = await uploadImagePinata(file);
        setFormData({ ...formData, image: imgUrl });
        notify({
          type: "success",
          message: "Image uploaded successfully",
          description: "Your new token image has been uploaded to IPFS"
        });
      } catch (error) {
        notify({ type: "error", message: "Failed to upload image" });
      }
      setIsLoading(false);
    }
  };

  const uploadImagePinata = async (file) => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    const response = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formDataUpload,
      headers: {
        pinata_api_key: `81eb45ae14d1d1884921`,
        pinata_secret_api_key: `a8d0bf76f69046e2cf5129f69310387316fbec8fd9730519e71d41df0a503703`,
        "Content-Type": "multipart/form-data",
      },
    });
    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  };

  const uploadMetadata = async () => {
    const { name, symbol, description, image } = formData;
    
    const data = JSON.stringify({
      name: name,
      symbol: symbol,
      description: description,
      image: image,
    });

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

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  };

  const updateMetadata = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: "Wallet not connected!" });
      return;
    }

    setIsLoading(true);
    try {
      const metadataUrl = await uploadMetadata();
      
      const mint = new PublicKey(tokenAddress);
      const metadataPDA = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
        ],
        PROGRAM_ID,
      )[0];
    
      const tokenMetadata = {
        name: formData.name, 
        symbol: formData.symbol,
        uri: metadataUrl,
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
      } as DataV2;

      const updateMetadataTransaction = new Transaction().add(
        createUpdateMetadataAccountV2Instruction(
          {
            metadata: metadataPDA,
            updateAuthority: publicKey,
          },
          {
            updateMetadataAccountArgsV2: {
              data: tokenMetadata,
              updateAuthority: publicKey,
              primarySaleHappened: true,
              isMutable: true,
            },
          }
        )
      );

      const signature = await sendTransaction(updateMetadataTransaction, connection);
      setUpdatedSignature(signature);
      setStep(3);

      notify({
        type: "success",
        message: "Metadata updated successfully!",
        description: "Your token metadata has been updated on the blockchain.",
        txid: signature,
      });
    } catch (error: any) {
      notify({ 
        type: "error", 
        message: "Failed to update metadata",
        description: error?.message || "Please try again"
      });
    }
    setIsLoading(false);
  }, [publicKey, connection, sendTransaction, tokenAddress, formData]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notify({
      type: "success",
      message: "Copied to clipboard!",
      description: "Text has been copied to your clipboard."
    });
  };

  const resetForm = () => {
    setStep(1);
    setTokenAddress("");
    setCurrentMetadata(null);
    setFormData({
      name: "",
      symbol: "",
      description: "",
      image: "",
      uri: ""
    });
    setUpdatedSignature("");
  };

  const features = [
    {
      icon: <LuEdit />,
      title: "Update Metadata",
      description: "Modify token name, symbol, description, and image"
    },
    {
      icon: <LuUpload />,
      title: "IPFS Storage",
      description: "Secure decentralized storage for your metadata"
    },
    {
      icon: <LuCheckCircle />,
      title: "On-Chain Update",
      description: "Direct blockchain metadata updates"
    }
  ];

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl text-center">
            <ClipLoader color="#8B5CF6" size={50} />
            <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
              {step === 1 ? "Loading metadata..." : step === 2 ? "Updating metadata..." : "Processing..."}
            </p>
          </div>
        </div>
      )}

      <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-6xl">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Branding */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-orange-500 to-red-600 text-white">
                <div className="h-full flex flex-col justify-center">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <LuEdit className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Update Token Metadata</h3>
                    <p className="text-orange-100 text-lg">
                      Modify your token's information including name, symbol, description, and visual assets
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
                          <p className="text-sm text-orange-100">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                    <h4 className="font-semibold mb-2">Important Note</h4>
                    <p className="text-sm text-orange-100">
                      You must be the update authority for the token to modify its metadata. 
                      Changes are permanent and stored on the blockchain.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Update Interface */}
              <div className="p-8 lg:p-12">
                <div className="h-full flex flex-col justify-center">
                  {step === 1 && (
                    <>
                      <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                          Load Token Metadata
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                          Enter the token address to load current metadata for editing
                        </p>
                      </div>

                      <div className="space-y-6">
                        <InputView
                          name="Token Address"
                          placeholder="Enter Solana token mint address"
                          clickhandle={(e) => setTokenAddress(e.target.value)}
                        />

                        <button
                          onClick={fetchCurrentMetadata}
                          disabled={!tokenAddress}
                          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                          <LuEdit className="w-5 h-5" />
                          Load Metadata
                        </button>

                        <button
                          onClick={() => setOpenUpdateMetadata(false)}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                          Edit Metadata
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                          Update your token's information and assets
                        </p>
                      </div>

                      <div className="space-y-6 max-h-96 overflow-y-auto">
                        <InputView
                          name="Token Name"
                          placeholder="Enter new token name"
                          clickhandle={(e) => handleFormFieldChange("name", e)}
                        />

                        <InputView
                          name="Symbol"
                          placeholder="Enter new symbol"
                          clickhandle={(e) => handleFormFieldChange("symbol", e)}
                        />

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Description
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => handleFormFieldChange("description", e)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                            rows={3}
                            placeholder="Enter token description"
                          />
                        </div>

                        {/* Image Upload */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Token Image
                          </label>
                          {formData.image ? (
                            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                              <img 
                                src={formData.image} 
                                alt="Token" 
                                className="w-16 h-16 rounded-xl object-cover"
                              />
                              <div className="flex-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Current image</p>
                                <label htmlFor="image-update" className="text-orange-600 hover:text-orange-700 cursor-pointer text-sm font-medium">
                                  Change image
                                </label>
                              </div>
                            </div>
                          ) : (
                            <label htmlFor="image-update" className="cursor-pointer">
                              <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center hover:border-orange-400 transition-colors">
                                <LuUpload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Upload new image</span>
                              </div>
                            </label>
                          )}
                          <input
                            id="image-update"
                            onChange={handleImageChange}
                            type="file"
                            className="hidden"
                            accept="image/*"
                          />
                        </div>
                      </div>

                      <div className="space-y-4 mt-8">
                        <button
                          onClick={updateMetadata}
                          disabled={!formData.name || !formData.symbol}
                          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                          <LuSave className="w-5 h-5" />
                          Update Metadata
                        </button>

                        <button
                          onClick={resetForm}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-colors"
                        >
                          Back to Search
                        </button>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <LuCheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                          Metadata Updated!
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                          Your token metadata has been successfully updated on the blockchain
                        </p>
                      </div>

                      {/* Updated Token Display */}
                      <div className="mb-8">
                        {formData.image && (
                          <img
                            src={formData.image}
                            alt="Token"
                            className="w-32 h-32 rounded-3xl object-cover mx-auto shadow-lg mb-6"
                          />
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                          {formData.name} ({formData.symbol})
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center">
                          {formData.description}
                        </p>
                      </div>

                      {/* Transaction Info */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Transaction Signature
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={updatedSignature}
                            readOnly
                            className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-mono text-sm"
                          />
                          <button
                            onClick={() => copyToClipboard(updatedSignature)}
                            className="p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors"
                          >
                            <LuCopy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <button
                          onClick={resetForm}
                          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                          <LuRefreshCw className="w-5 h-5" />
                          Update Another Token
                        </button>

                        <button
                          onClick={() => setOpenUpdateMetadata(false)}
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