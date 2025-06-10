import { useEffect, useState } from "react";
import { LuCheckCircle, LuInfo, LuXCircle, LuX, LuExternalLink } from "react-icons/lu";
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

  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, 8000);

    return () => {
      clearInterval(id);
    };
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
        return "border-green-500/20";
      case "info":
        return "border-blue-500/20";
      case "error":
        return "border-red-500/20";
      default:
        return "border-blue-500/20";
    }
  };

  return (
    <div className={`pointer-events-auto w-full max-w-sm mx-auto`}>
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 ${getBorderColor()} backdrop-blur-xl overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon()}
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
                <div className="mt-3">
                  <a
                    href={`https://explorer.solana.com/tx/${txid}?cluster=${networkConfiguration}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                  >
                    <LuExternalLink className="w-4 h-4" />
                    <span>View Transaction</span>
                  </a>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {txid.slice(0, 8)}...{txid.slice(-8)}
                  </p>
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
            className={`h-full ${
              type === 'success' ? 'bg-green-500' : 
              type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            } animate-pulse`}
            style={{
              animation: 'shrink 8s linear forwards'
            }}
          ></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default NotificationList;