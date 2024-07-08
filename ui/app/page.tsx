"use client";
import { Chatbot } from "@/components/chatbot";
import { Header } from "@/components/header";
import { PrivateRoute } from "@/components/privateRoute";
import { SelectInterface } from "@/interfaces/common";
import { useState } from "react";

export default function Home() {
  const [model, setModel] = useState<SelectInterface | null>({
    value: "grumpy",
    label: "Grumpy",
  });
  return (
    <PrivateRoute>
      <main className="flex m-auto min-h-screen flex-col items-center justify-between h-screen bg-white">
        <Header model={model} setModel={setModel} />
        <Chatbot model={model} />
      </main>
    </PrivateRoute>
  );
}
