// const fetchAccessToken = async () => {
//   const host: string = "http://api.wisey.app";
//   const version: string = "api/v1";
//   const response = await fetch(
//     `${host}/${version}/auth/anonymous?platform=subscriptions`
//   );
//   const { token } = await response.json();
//   return token;
// };

// export default fetchAccessToken;

// type TokenProps = {
//   token: string;
// };

import { TokenProps } from "../../helpers/types";

// const fetchAccessToken = async (): Promise<TokenProps> => {
//   const host: string = "http://api.wisey.app";
//   const version: string = "api/v1";
//   const response = await fetch(
//     `${host}/${version}/auth/anonymous?platform=subscriptions`
//   );
//   const { token } = await response.json();
//   return token;
// };

// export default fetchAccessToken;
const fetchAccessToken = async (): Promise<TokenProps> => {
  const host: string = "http://api.wisey.app";
  const version: string = "api/v1";
  const response = await fetch(
    `${host}/${version}/auth/anonymous?platform=subscriptions`
  );
  //const { token } = await response.json();
  const { token }: { token: string } = await response.json();
  return token;
};

export default fetchAccessToken;
