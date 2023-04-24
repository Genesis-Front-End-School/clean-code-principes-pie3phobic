export default async function getCourseData(id) {
  try {
    const host = "http://api.wisey.app";
    const version = "api/v1";
    const accessToken = await fetch(
      `${host}/${version}/auth/anonymous?platform=subscriptions`
    );
    const accesData = await accessToken.json();
    const token = accesData.token;
    const res = await fetch(`${host}/${version}/core/preview-courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return { data, accesData };
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
}
