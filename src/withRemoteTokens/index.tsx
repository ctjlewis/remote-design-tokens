// import { useEffect, useState } from "react";

// interface WithRemoteTokensProps extends DesignTokenConfig {
//   provider: DesignTokenProvider<{}>;
// }

// export const withRemoteTokens = ({ tokenField, propFields }: WithRemoteTokensProps) => {
//   const [tokens, setTokens] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`/api/tokens?tokenField=${tokenField}&propFields=${propFields.join(',')}`)
//       .then(res => res.json())
//       .then(data => {
//         setTokens(data);
//         setLoading(false);
//       });
//   }, [tokenField, propFields]);

//   return { tokens, loading };
// }