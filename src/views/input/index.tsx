import { FC } from "react";

export const InputView: FC = ({ placeholder, name, clickhandle }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {name}
      </label>
      <input
        type="text"
        onChange={clickhandle}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
};