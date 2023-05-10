import { TokenProps } from "../../helpers/types";

export function fetchAccessTokenMock(): Promise<TokenProps> {
  return Promise.resolve("mock_access_token");
}
