type Issue = {
  content: {
    number: number;
    title: string;
    url: string;
    state: 'OPEN' | 'CLOSED';
  };
};

export type { Issue };
