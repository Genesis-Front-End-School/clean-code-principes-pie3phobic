// import fetchAccessToken from "./accessToken";
// class ApiClient {
//   static instance;
//   accessToken;

//   static async getInstance() {
//     if (!ApiClient.instance) {
//       ApiClient.instance = new ApiClient();
//       await ApiClient.instance.refreshToken();
//     }
//     return ApiClient.instance;
//   }

//   async refreshToken() {
//     this.accessToken = await fetchAccessToken();
//     setTimeout(() => {
//       this.refreshToken();
//     }, 3600 * 1000);
//   }

//   async getCourseData(id) {
//     try {
//       const host = "http://api.wisey.app";
//       const version = "api/v1";
//       const res = await fetch(`${host}/${version}/core/preview-courses/${id}`, {
//         headers: {
//           Authorization: `Bearer ${this.accessToken}`,
//         },
//       });
//       const data = await res.json();
//       return { data, accessToken: this.accessToken };
//     } catch (error) {
//       console.error("Error fetching course data:", error);
//       throw error;
//     }
//   }

//   getToken() {
//     return this.accessToken;
//   }
// }

// export default ApiClient;
import fetchAccessToken from "./accessToken";
import { CourseDataProps } from "../../helpers/types";

class ApiClient {
  static instance: ApiClient;
  accessToken: string;

  static async getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
      await ApiClient.instance.refreshToken();
    }
    return ApiClient.instance;
  }

  async refreshToken(): Promise<void> {
    this.accessToken = await fetchAccessToken();
    setTimeout(() => {
      this.refreshToken();
    }, 3600 * 1000);
  }

  async getCourseData(id: string): Promise<{ data: CourseDataProps }> {
    try {
      const host: string = "http://api.wisey.app";
      const version: string = "api/v1";
      const res = await fetch(`${host}/${version}/core/preview-courses/${id}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const data: CourseDataProps = (await res.json()) as CourseDataProps;
      return { data };
    } catch (error) {
      console.error("Error fetching course data:", error);
      throw error;
    }
  }

  getToken() {
    return this.accessToken;
  }
}

export default ApiClient;
