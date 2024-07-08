"use client";
import { loginService } from "@/services/loginService";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./input";
import { useRouter } from "next/navigation";

export const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const payload = {
      username,
      password,
    };
    const resp = await loginService(payload);
    if (resp) {
      toast.success("Login successfull!");
      localStorage.setItem("access_token", resp.access_token);
      router.push("/");
    }
  };

  return (
    <div className="flex-1">
      <form
        onSubmit={onSubmitHandler}
        className=" border rounded-lg p-8 bg-slate-50 w-80 m-12"
      >
        <h4 className="text-2xl font-semibold dark:text-white text-center mb-4 text-sky-900">
          Log In
        </h4>
        <Input
          label="User Name"
          value={username}
          setValue={setUsername}
          required={true}
          type="text"
          name="user_name"
        />
        <Input
          label="Password"
          value={password}
          setValue={setPassword}
          required={true}
          type="password"
          name="password"
        />
        <button
          disabled={!(username && password)}
          type="submit"
          className={`text-white bg-gradient-to-r from-green-500 via-lime-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
            !(username && password) ? "opacity-40" : ""
          }`}
        >
          Log In
        </button>
      </form>
    </div>
  );
};
