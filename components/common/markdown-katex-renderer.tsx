"use client";
import "katex/dist/katex.min.css";
import type { ComponentType, JSX, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// Define props for specific components
interface CodeProps {
  inline?: boolean;
  className?: string;
  children: ReactNode;
  [key: string]: unknown; // For additional props passed to code
}

interface GenericProps {
  children: ReactNode;
  [key: string]: unknown; // For other HTML attributes
}

interface LinkProps {
  children: ReactNode;
  href?: string;
  [key: string]: unknown;
}

// Union type for all possible component props
type ComponentProps = CodeProps | GenericProps | LinkProps;

// Define the Components interface with specific prop types
interface Components {
  [key: string]: ComponentType<ComponentProps> | keyof JSX.IntrinsicElements;
}

interface MarkdownKatexRendererProps {
  content: string;
  className?: string;
  components?: Components;
}

// Suppress KaTeX warnings for Vietnamese characters
const originalConsoleWarn = console.warn;

console.warn = (...args: unknown[]) => {
  const message = args[0];
  if (
    typeof message === "string" &&
    message.includes("No character metrics for")
  ) {
    return; // Suppress these specific warnings
  }
  originalConsoleWarn.apply(console, args);
};

export function MarkdownKatexRenderer({
  content,
  className = "",
  components = {},
}: MarkdownKatexRendererProps) {
  const defaultComponents: Components = {
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          customStyle={{ borderRadius: "0.25rem" }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className={`${
            className || ""
          } bg-muted px-1 py-0.5 rounded-lg text-sm`}
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({ children }: GenericProps) => (
      <h1 className="mb-4 font-bold text-foreground text-3xl">{children}</h1>
    ),
    h2: ({ children }: GenericProps) => (
      <h2 className="mb-3 font-semibold text-foreground text-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }: GenericProps) => (
      <h3 className="mb-2 font-semibold text-foreground text-xl">{children}</h3>
    ),
    p: ({ children }: GenericProps) => (
      <p className="mb-4 text-foreground leading-relaxed">{children}</p>
    ),
    ul: ({ children }: GenericProps) => (
      <ul className="mb-4 text-foreground list-disc list-inside">{children}</ul>
    ),
    ol: ({ children }: GenericProps) => (
      <ol className="mb-4 text-foreground list-decimal list-inside">
        {children}
      </ol>
    ),
    li: ({ children }: GenericProps) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }: GenericProps) => (
      <blockquote className="mb-4 pl-4 border-primary border-l-4 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
    table: ({ children }: GenericProps) => (
      <div className="mb-4 overflow-x-auto">
        <table className="border border-border min-w-full border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: GenericProps) => (
      <th className="bg-muted px-4 py-2 border border-border font-semibold text-foreground text-left">
        {children}
      </th>
    ),
    td: ({ children }: GenericProps) => (
      <td className="px-4 py-2 border border-border text-foreground">
        {children}
      </td>
    ),
    a: ({ children, href }: LinkProps) => (
      <a
        href={href}
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    ...components,
  };

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[
          [
            remarkMath,
            {
              strict: false,
            },
          ],
          [
            remarkGfm,
            {
              strict: false,
            },
          ],
        ]}
        rehypePlugins={[
          [
            rehypeKatex,
            {
              strict: false,
              trust: true,
              throwOnError: false,
              output: "html",
              displayMode: false,
            },
          ],
        ]}
        components={defaultComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}