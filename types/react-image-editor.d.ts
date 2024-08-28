declare module '@toast-ui/react-image-editor' {
  import type { MutableRefObject } from 'react';
  import type ImageEditor from 'tui-image-editor';

  export type ImageEditorInstance = ImageEditor & {
    getInstance: () => ImageEditorInstance;
    resize: (size: { width: number; height: number }) => Promise<void>;
  };

  type Props = ConstructorParameters<typeof ImageEditor>[1] & {
    ref: MutableRefObject<ImageEditor | undefined>;
  };

  export default function BaseImageEditor(props: Props): JSX.Element;
}
