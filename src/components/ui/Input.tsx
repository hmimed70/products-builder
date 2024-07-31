import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ ...rest}: IProps) => {
  return (
        <input className="border-[1px] border-gray-300 shadow-md text-gray-900
         text-md rounded-md focus:border-indigo-500
          focus:ring-indigo-500 block w-full px-3 py-3 focus:ring-1 focus:outline-none"
           {...rest}
        />
  );
};

export default Input;