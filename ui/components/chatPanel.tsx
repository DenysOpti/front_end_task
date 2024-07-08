import Markdown from "react-markdown";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { MessageInterface } from "@/interfaces/common";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const ChatPanel: React.FC<{ messageList: MessageInterface[] }> = ({
  messageList,
}) => {
  const panelRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    panelRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messageList]);
  const chatHistoryUI = messageList.map((data, index) => {
    return (
      <div
        key={index + data.content}
        className="relative py-4 border-b border-slate-200/50"
      >
        <Image
          src={`/chat-icon-${data.role}.png`}
          className="absolute rounded-full"
          alt="logo"
          width={25}
          height={25}
          priority
        />
        <Markdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          className="px-12 break-words"
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={dark}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {data.content}
        </Markdown>
      </div>
    );
  });
  return (
    <div className="w-full flex-1 overflow-auto justify-items-start p-8 max-w-6xl">
      {chatHistoryUI}
      <div ref={panelRef}></div>
    </div>
  );
};
