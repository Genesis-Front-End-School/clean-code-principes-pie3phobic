const fetchAccessToken = async () => {
  const host = "http://api.wisey.app";
  const version = "api/v1";
  const response = await fetch(
    `${host}/${version}/auth/anonymous?platform=subscriptions`
  );
  const { token } = await response.json();
  return token;
};

export default fetchAccessToken;
