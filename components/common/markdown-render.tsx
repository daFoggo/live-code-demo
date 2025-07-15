import ReactMarkdown from "react-markdown";

const MarkDownRenderer = ({content} : {
    content: string;
}) => {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        a: ({ children, href }) => (
          <a 
            href={href} 
            className="text-primary underline hover:no-underline transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          return isInline ? (
            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
              {children}
            </code>
          ) : (
            <code className="block bg-muted p-3 rounded-lg overflow-x-auto font-mono text-xs">
              {children}
            </code>
          );
        },
        ul: ({ children }) => (
          <ul className="space-y-1 mb-2 list-disc list-inside">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-1 mb-2 list-decimal list-inside">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="text-sm">{children}</li>,
        h1: ({ children }) => (
          <h1 className="mt-4 first:mt-0 mb-2 font-semibold text-lg">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-3 first:mt-0 mb-2 font-semibold text-base">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-3 first:mt-0 mb-2 font-semibold text-sm">
            {children}
          </h3>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-2 pl-4 border-muted-foreground/20 border-l-4 italic">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkDownRenderer;
