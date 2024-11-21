import React from "react";

interface FooterProps {
  creatorName: string;
  creatorUrl: string;
  repoUrl: string;
}

const Footer: React.FC<FooterProps> = ({ creatorName, creatorUrl, repoUrl }) => {
  return (
    <footer className="py-8 mx-4 flex flex-col md:flex-row md:gap-x-4 items-center justify-center border-t-2 text-center text-foreground/60 text-sm md:text-lg">
      <span>
        Made by{" "}
        <a
          className="underline font-bold"
          href={creatorUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {creatorName}
        </a>{" "}
      </span>
      <span>
        Check the repo{" "}
        <a
          className="underline font-bold"
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </span>
    </footer>
  );
};

export { Footer };
