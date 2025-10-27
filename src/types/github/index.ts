type CookieValue = {
  name: string;
  value: string;
};

export type MutableCookies = {
  get: (name: string) => CookieValue | undefined;
  set: (opts: {
    name: string;
    value: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    path?: string;
  }) => void;
};

export type GitHubCommit = {
  oid: string;
  messageHeadline: string;
  url: string;
};

export type GitHubPR = {
  number: number;
  title: string;
  url: string;
  bodyText: string;
  repository: { nameWithOwner: string };
  commits: { nodes: { commit: GitHubCommit }[] };
};
