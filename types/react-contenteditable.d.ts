import type { GenericFunction } from '@/lib/function';

declare module 'react-contenteditable' {
  export default class ContentEditable<T> extends React.Component<{
    html: string;
    tagName?: string;
    disabled?: boolean;
    className?: string;
    onBlur?: GenericFunction;
    onKeyUp?: GenericFunction;
    onKeyDown?: GenericFunction;
    // Was originally typed as Object.
    style?: React.CSSProperties;
    innerRef?: React.RefObject<HTMLElement> | GenericFunction;
    // I am currently only using onChange. I didn't update the other event handler definitions,
    // but if you want strict typing, they all follow a similar pattern.
    onChange?: (event: React.ChangeEvent<ContentEditableElement>) => T;
    // Add this so the Typescript compiler will let you add a placeholder prop to
    // the ContentEditable component.
    placeholder?: string;
  }> {}

  // Extending value to HTMLElement is enough for my use case.
  // I haven't had a look at the source code in detail, there may be other keys
  // that were appended to the underlying HTMLElement.
  interface ContentEditableElement extends HTMLElement {
    value: string;
  }
}
