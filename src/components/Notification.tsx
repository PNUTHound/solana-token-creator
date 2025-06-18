import { useEffect, useState } from "react";
import { LuCheckCircle, LuInfo, LuXCircle, LuX, LuExternalLink, LuCopy } from "react-icons/lu";
import useNotificationStore from "../stores/useNotificationStore";
import { useConnection } from "@solana/wallet-adapter-react";
import { useNetworkConfiguration } from "contexts/NetworkConfigurationProvider";

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s
  );

  const reversedNotifications = [...notifications].reverse();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:p-6">
      <div className="flex w-full flex-col space-y-4">
        {reversedNotifications.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Notification = ({ type, message, description, txid, onHide }) => {
  const { connection } = useConnection();
  const { networkConfiguration } = useNetworkConfiguration();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 8000;
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(timer);
          onHide();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onHide]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <LuCheckCircle className="w-6 h-6 text-green-500" />;
      case "info":
        return <LuInfo className="w-6 h-6 text-blue-500" />;
      case "error":
        return <LuXCircle className="w-6 h-6 text-red-500" />;
      default:
        return <LuInfo className="w-6 h-6 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-500/20 bg-green-50/80 dark:bg-green-900/20";
      case "info":
        return "border-blue-500/20 bg-blue-50/80 dark:bg-blue-900/20";
      case "error":
        return "border-red-500/20 bg-red-50/80 dark:bg-red-900/20";
      default:
        return "border-blue-500/20 bg-blue-50/80 dark:bg-blue-900/20";
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const copyTxId = () => {
    if (txid) {
      navigator.clipboard.writeText(txid);
    }
  };

  return (
    <div className="pointer-events-auto w-full max-w-sm mx-auto transform transition-all duration-500 ease-out">
      <div className={`bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl border-2 ${getBorderColor()} backdrop-blur-xl overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg">
                {getIcon()}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {message}
              </h4>
              {description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
              {txid && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://explorer.solana.com/tx/${txid}?cluster=${networkConfiguration}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      <LuExternalLink className="w-4 h-4" />
                      <span>View Transaction</span>
                    </a>
                    <button
                      onClick={copyTxId}
                      className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Copy transaction ID"
                    >
                      <LuCopy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all">
                      {txid.slice(0, 8)}...{txid.slice(-8)}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={onHide}
              className="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <LuX className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div 
            className={`h-full ${getProgressColor()} transition-all duration-75 ease-linear`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;