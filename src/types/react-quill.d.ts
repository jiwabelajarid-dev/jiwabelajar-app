declare module "react-quill" {
  import * as React from "react";

  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    onChange?: (content: string, delta: any, source: any, editor: any) => void;
    readOnly?: boolean;
    theme?: string;
    placeholder?: string;
    modules?: any;
    formats?: string[];
    bounds?: string | HTMLElement;
    style?: React.CSSProperties;
    className?: string;
  }

  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}
