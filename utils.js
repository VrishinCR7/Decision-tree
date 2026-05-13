// Shared utilities

/** Sleep for `ms` milliseconds */
export const sleep = (ms: number) =>
  new Promise<void>(r => setTimeout(r, ms));

/** Retry an async function up to `n` times with exponential backoff */
export const retry = async <T>(fn: () => Promise<T>, n = 3): Promise<T> => {
  for (let i = 0; i < n; i++) {
    try { return await fn(); }
    catch (e) { if (i === n - 1) throw e; await sleep(1000 * 2 ** i); }
  }
  throw new Error("unreachable");
};

/** Split array into chunks of `size` */
export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
