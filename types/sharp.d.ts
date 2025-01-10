declare module 'ssharp' {
  // Try to use Sharp's own types if available

  export * from 'sharp/lib/index';
  export { default } from 'sharp/lib/index';
}

// Fallback types if Sharp's types aren't available
declare module 'sharp/lib/index' {
  import type { Duplex } from 'node:stream';

  export type Metadata = {
    format?: string;
    size?: number;
    width?: number;
    height?: number;
    channels?: number;
  };

  export type Sharp = {
    metadata(): Promise<Metadata>;
    clone(): Sharp;
    png(): Sharp;
    resize(width?: number, height?: number, options?: ResizeOptions): Sharp;
    extend(options: ExtendOptions): Sharp;
    toFile(fileOut: string): Promise<OutputInfo>;
  } & Duplex;

  export type ResizeOptions = {
    width?: number;
    height?: number;
    fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
    background?: Color | string;
  };

  export type ExtendOptions = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    background?: Color | string;
  };

  export type Color = {
    r?: number;
    g?: number;
    b?: number;
    alpha?: number;
  };

  export type OutputInfo = {
    format: string;
    width: number;
    height: number;
    channels: number;
    size: number;
  };

  const sharp: (input?: string | Buffer | ArrayBuffer | Uint8Array) => Sharp;

  export default sharp;
}
