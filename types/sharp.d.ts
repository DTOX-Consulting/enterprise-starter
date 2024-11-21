declare module 'sharp' {
  type SharpInstance = {
    png(): SharpInstance;
    resize(options: {
      width: number;
      height: number;
      fit: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
      background?: string;
    }): SharpInstance;
    resize(width: number, height: number): SharpInstance;
    toFile(output: string): Promise<void>;
    toFile(output: string, callback: (err: Error | undefined, info: object) => void): void;
  };

  type Sharp = {
    (input?: string | Buffer | Uint8Array): SharpInstance;
    cache(isEnabled: boolean): void;
    concurrency(concurrency: number): void;
    counters(): SharpCounters;
    simd(isEnabled: boolean): boolean;
    format: Record<string, object>;
  };

  type SharpCounters = {
    queue: number;
    process: number;
  };

  const sharp: Sharp;
  export default sharp;
}
