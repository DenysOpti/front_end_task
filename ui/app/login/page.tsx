"use client";
import { Header } from "@/components/header";
import { Login } from "@/components/login";
import { UnAuthRoute } from "@/components/unAuthRoute";
import { SelectInterface } from "@/interfaces/common";
import { useState } from "react";

export default function Home() {
  const [model, setModel] = useState<SelectInterface | null>({
    value: "grumpy",
    label: "Grumpy",
  });
  return (
    <UnAuthRoute>
      <main className="flex m-auto min-h-screen flex-col items-center justify-between h-screen bg-white">
        <Header model={model} setModel={setModel} />
        <Login />
      </main>
    </UnAuthRoute>
  );
}
