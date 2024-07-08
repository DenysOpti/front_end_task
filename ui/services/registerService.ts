import { RegisterPayloadInterface } from "@/interfaces/common";
import { catchError } from "@/utils/common";
import axios from "axios";

export const registerService = async (payload: RegisterPayloadInterface) => {
  const apiURl = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
  const headers = {
    Authorization: ``,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const { data, status } = await axios.post(apiURl, payload, { headers });
    return data;
  } catch (error: any) {
    console.log(error);
    catchError(
      error?.response?.status,
      error?.response?.data?.detail === "REGISTER_USER_ALREADY_EXISTS"
        ? "This email already exist, please log in."
        : ""
    );
  }
};
