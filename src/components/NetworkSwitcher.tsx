import { FC, useState } from "react";
import dynamic from "next/dynamic";
import { useNetworkConfiguration } from "../contexts/NetworkConfigurationProvider";
import { LuChevronDown, LuGlobe, LuWifi } from "react-icons/lu";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();
  const [isOpen, setIsOpen] = useState(false);

  const networks = [
    { 
      value: "mainnet-beta", 
      label: "Mainnet", 
      color: "bg-green-500",
      description: "Production network"
    },
    { 
      value: "devnet", 
      label: "Devnet", 
      color: "bg-yellow-500",
      description: "Development network"
    },
    { 
      value: "testnet", 
      label: "Testnet", 
      color: "bg-blue-500",
      description: "Testing network"
    },
  ];

  const currentNetwork = networks.find(n => n.value === networkConfiguration) || networks[1];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md group"
      >
        <div className="flex items-center space-x-2">
          <LuWifi className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <div className={`w-2 h-2 rounded-full ${currentNetwork.color} animate-pulse`}></div>
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentNetwork.label}
        </span>
        <LuChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="p-2">
            {networks.map((network) => (
              <button
                key={network.value}
                onClick={() => {
                  setNetworkConfiguration(network.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-xl ${
                  networkConfiguration === network.value ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${network.color} ${networkConfiguration === network.value ? 'animate-pulse' : ''}`}></div>
                  <LuGlobe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {network.label}
                    </span>
                    {networkConfiguration === network.value && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {network.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Switch networks to deploy on different Solana environments
            </p>
          </div>
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