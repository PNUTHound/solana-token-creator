import { FC, useState } from "react";
import dynamic from "next/dynamic";
import { useNetworkConfiguration } from "../contexts/NetworkConfigurationProvider";
import { LuChevronDown, LuGlobe } from "react-icons/lu";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();
  const [isOpen, setIsOpen] = useState(false);

  const networks = [
    { value: "mainnet-beta", label: "Mainnet", color: "bg-green-500" },
    { value: "devnet", label: "Devnet", color: "bg-yellow-500" },
    { value: "testnet", label: "Testnet", color: "bg-blue-500" },
  ];

  const currentNetwork = networks.find(n => n.value === networkConfiguration) || networks[1];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 transition-colors"
      >
        <LuGlobe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${currentNetwork.color}`}></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentNetwork.label}
          </span>
        </div>
        <LuChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
          {networks.map((network) => (
            <button
              key={network.value}
              onClick={() => {
                setNetworkConfiguration(network.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                networkConfiguration === network.value ? 'bg-purple-50 dark:bg-purple-900/20' : ''
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${network.color}`}></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {network.label}
              </span>
              {networkConfiguration === network.value && (
                <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
  ssr: false,
});