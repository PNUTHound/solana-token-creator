import { FC } from "react";

interface InputViewProps {
  placeholder: string;
  name: string;
  clickhandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputView: FC<InputViewProps> = ({ placeholder, name, clickhandle }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {name}
      </label>
      <input
        type="text"
        onChange={clickhandle}
        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
        placeholder={placeholder}
      />
    </div>
  );
};