import Image from "next/image";
import { isAuthorized, logout } from "@/utils/common";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { SelectInterface } from "@/interfaces/common";
import { AI_MODEL_OPTIONS } from "@/constants/common";
import { useRouter } from "next/navigation";

interface props {
  model: SelectInterface | null;
  setModel: (data: SelectInterface | null) => void;
}
export const Header: React.FC<props> = ({ model, setModel }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoggedIn(isAuthorized());
  }, []);
  const onLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <div className="w-full justify-between flex px-4 sm:px-8 lg:px-16 py-4 bg-gradient-to-r from-indigo-50 to-lime-50">
      <a
        href="https://www.optimizely.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/optimizely-logo.svg"
          alt="Optimizely Logo"
          width={130}
          height={40}
          priority
        />
      </a>
      <div className="flex gap-x-2">
        {isLoggedIn ? (
          <>
            <ReactSelect
              defaultValue={model}
              onChange={(option: SelectInterface | null) => setModel(option)}
              options={AI_MODEL_OPTIONS}
            />
            <button
              onClick={onLogout}
              type="submit"
              className="text-white bg-gradient-to-r from-red-500 via-black-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/login")}
              className="text-white bg-gradient-to-r from-green-500 via-lime-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Log In
            </button>
            <button
              onClick={() => router.push("/register")}
              className="text-white bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};
