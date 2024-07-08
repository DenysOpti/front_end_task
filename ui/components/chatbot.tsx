"use client";
import React, { useState } from "react";
import { getAIResponse } from "@/services/getAIResponse";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useEnterSubmit } from "@/hooks/useEnterSubmit";
import { MessageInterface, SelectInterface } from "@/interfaces/common";
import { ChatPanel } from "./chatPanel";
import Image from "next/image";

interface props {
  model: SelectInterface | null;
}
export const Chatbot: React.FC<props> = ({ model }) => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<MessageInterface[]>([]);
  const { formRef, onKeyDown } = useEnterSubmit();
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setChatHistory((previousState) => [
      ...previousState,
      {
        role: "user",
        content: input,
      },
    ]);
    setInput("");
    const resp = await getAIResponse({
      type: model?.value || "",
      content: input,
    });
    if (resp) {
      setChatHistory((previousState) => [
        ...previousState,
        {
          role: model?.value || "",
          content: resp,
        },
      ]);
    }
  };
  return (
    <>
      <ChatPanel messageList={chatHistory} />
      <form
        ref={formRef}
        onSubmit={onSubmitHandler}
        className="w-full max-w-4xl"
      >
        <div className="w-full p-8 relative">
          <ReactTextareaAutosize
            onKeyDown={onKeyDown}
            placeholder={`Message ${model?.label}...`}
            className="flex w-full rounded-md border border-input bg-transparent px-12 py-4 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxRows={5}
            minRows={1}
            required={true}
          />
          <Image
            src="/enter.png"
            alt="enter"
            width={35}
            height={35}
            priority
            role="button"
            onClick={onSubmitHandler}
            className={`absolute right-12 bottom-10 ${
              !input ? "opacity-20 pointer-events-none" : ""
            }`}
          />
        </div>
      </form>
    </>
  );
};
