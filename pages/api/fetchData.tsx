import fetchAccessToken from "./accessToken";
class ApiClient {
  static instance;
  accessToken;

  static async getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
      await ApiClient.instance.refreshToken();
    }
    return ApiClient.instance;
  }

  async refreshToken() {
    this.accessToken = await fetchAccessToken();
    // Schedule the next token refresh in 1 hour
    setTimeout(() => {
      this.refreshToken();
    }, 3600 * 1000);
  }

  async fetchData() {
    try {
      const host = "http://api.wisey.app";
      const version = "api/v1";
      const res = await fetch(`${host}/${version}/core/preview-courses`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const data = await res.json();
      return { data: data || null, accessToken: this.accessToken || null };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  getToken() {
    return this.accessToken;
  }
}

export default ApiClient;
