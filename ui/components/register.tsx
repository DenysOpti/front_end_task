"use client";
import { registerService } from "@/services/registerService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./input";
import { isEmailValid } from "@/utils/common";

export const Register = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    const resp = await registerService(payload);
    if (resp) {
      toast.success("Registration successful!");
      router.push("/login");
    }
  };

  return (
    <div className="flex-1">
      <form
        onSubmit={onSubmitHandler}
        className=" border rounded-lg p-8 bg-slate-50 w-80 m-12"
      >
        <h4 className="text-2xl font-semibold dark:text-white text-center mb-4 text-sky-900">
          Sign Up
        </h4>
        <Input
          label="Email"
          value={email}
          setValue={setEmail}
          required={true}
          type="text"
          name="email"
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
          disabled={!(isEmailValid(email) && password)}
          type="submit"
          className={`text-white bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
            !(isEmailValid(email) && password) ? "opacity-40" : ""
          }`}
        >
          Register
        </button>
      </form>
    </div>
  );
};
