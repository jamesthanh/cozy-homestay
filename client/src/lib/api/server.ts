interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error {
  message: String;
}
export const server = {
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new ErrorEvent('failed to fetch');
    }
    return res.json() as Promise<{ data: TData; errors: Error[] }>;
  },
};
