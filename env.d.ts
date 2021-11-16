interface DesignTokenConfig {
  tokenField: string;
  propFields: string[];
}

interface DesignTokenProps {
  [key: string]: any;
}

interface DesignToken {
  id: string;
  props: DesignTokenProps;
}

type DesignTokenProvider<T> = ({ tokenField, propFields }: DesignTokenConfig & T) => DesignToken[] | Promise<DesignToken[]>;