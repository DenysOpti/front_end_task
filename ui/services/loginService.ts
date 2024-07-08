import { LoginPayloadInterface } from "@/interfaces/common";
import { catchError } from "@/utils/common";
import axios from "axios";

export const loginService = async (payload: LoginPayloadInterface) => {
  const apiURl = `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/login`;
  const headers = {
    Authorization: ``,
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const { data, status } = await axios.post(apiURl, payload, { headers });
    if (status === 200) return data;
  } catch (error: any) {
    catchError(error?.response?.status, "Invalid username or password!");
  }
};
