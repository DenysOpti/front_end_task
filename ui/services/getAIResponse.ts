import { PromptInterface } from "@/interfaces/common";
import { catchError } from "@/utils/common";
import axios from "axios";

export const getAIResponse = async (prompt: PromptInterface) => {
  const apiURl = `${process.env.NEXT_PUBLIC_API_URL}/aichat`;
  const accessToken = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const { data, status } = await axios.post(apiURl, prompt, { headers });
    return data?.response;
  } catch (error: any) {
    catchError(error?.response?.status);
  }
};
