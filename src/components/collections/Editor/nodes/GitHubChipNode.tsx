/* eslint-disable max-len */
import React, { type JSX } from "react";

import { DecoratorNode, LexicalNode, SerializedLexicalNode } from "lexical";

export type SerializedGitHubChipNode = SerializedLexicalNode & {
  url: string;
  title: string;
  label: string;
  description?: string;
};

type GitHubChipProps = {
  url: string;
  title: string;
  label: string;
  description?: string;
};

export const GitHubChip = ({ url, title, label, description }: GitHubChipProps): JSX.Element => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      title={title}
      className="inline-flex items-center gap-2 max-w-full mr-2 mb-2 px-3 py-1 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] text-sm text-gray-800"
      style={{ textDecoration: "none" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 flex-shrink-0 text-gray-700"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29
              6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2
              .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01
              1.08.58 1.23.82.72 1.21 1.87.87
              2.33.66.07-.52.28-.87.51-1.07
              -1.78-.2-3.64-.89-3.64-3.95
              0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
              0 0 .67-.21 2.2.82A7.58 7.58
              0 018 4.77c.68.003 1.36.092 2
              .27 1.53-1.03 2.2-.82 2.2-.82.44
              1.1.16 1.92.08 2.12.51.56.82
              1.28.82 2.15 0 3.07-1.87 3.75-3.65
              3.95.29.25.54.73.54 1.48 0
              1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013
              8.013 0 0016 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
      <div className="flex flex-col min-w-0">
        <span className="font-semibold truncate">{label}</span>
        <span className="font-medium text-gray-900 truncate">{title}</span>
        {description && (
          <span className="text-xs text-gray-600 line-clamp-2">{description}</span>
        )}
      </div>
    </a>

  );
}

export class GitHubChipNode extends DecoratorNode<React.ReactNode> {
  __url: string;
  __title: string;
  __label: string;
  __description?: string;

  static getType(): string {
    return "github-chip";
  }

  static clone(node: GitHubChipNode): GitHubChipNode {
    return new GitHubChipNode(node.__url, node.__title, node.__label, node.__description, node.__key);
  }

  constructor(url: string, title: string, label: string, description?: string, key?: string) {
    super(key);
    this.__url = url;
    this.__title = title;
    this.__label = label;
    this.__description = description;
  }

  createDOM(): HTMLElement {
    const span = document.createElement('span');
    return span;
  }

  updateDOM(): false {
    return false;
  }


  // This is where the React component is rendered
  decorate(): React.ReactNode {
    return (
      <GitHubChip url={this.__url} title={this.__title} label={this.__label} description={this.__description} />
    );
  }

  // JSON serialization (optional but recommended)
  exportJSON(): SerializedGitHubChipNode {
    return {
      type: GitHubChipNode.getType(),
      version: 1,
      url: this.__url,
      title: this.__title,
      label: this.__label,
      description: this.__description
    };
  }

  static importJSON(serializedNode: SerializedGitHubChipNode): GitHubChipNode {
    return new GitHubChipNode(
      serializedNode.url,
      serializedNode.title,
      serializedNode.label,
      serializedNode.description
    );
  }
}

// Helper to create the node
export function $createGitHubChipNode({
  url,
  title,
  label,
  description,
}: {
  url: string;
  title: string;
  label: string;
  description?:string;
}): GitHubChipNode {
  return new GitHubChipNode(url, title, label, description);
}

export function $isGitHubChipNode(node: LexicalNode | null | undefined): node is GitHubChipNode {
  return node instanceof GitHubChipNode;
}

