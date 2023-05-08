import { getServerSideProps } from "../courses";
import { fetchDataMock } from "./fetchDataMock";
import { fetchAccessTokenMock } from "./accessTokenMock";
import ApiClient from "./getCourseData";

jest.mock("./getCourseData");

describe("getServerSideProps", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch data with access token and return it", async () => {
    // arrange
    const mockData = fetchDataMock();
    const mockAccessToken = "mock_access_token";
    (ApiClient.getInstance as jest.Mock).mockResolvedValueOnce({
      fetchData: jest.fn().mockResolvedValueOnce(mockData),
      getToken: jest.fn().mockReturnValueOnce(mockAccessToken),
    });

    // act
    const result = await getServerSideProps();
    // assert
    expect(ApiClient.getInstance).toHaveBeenCalledTimes(1);
    expect(ApiClient.getInstance).toHaveBeenCalledWith();
    expect(result).toEqual({
      props: { data: mockData },
    });
  });
});
