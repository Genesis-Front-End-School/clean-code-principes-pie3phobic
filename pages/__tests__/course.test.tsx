// import React, { useState } from "react";
// import InfoCard from "../../components/InfoCard";
// import Header from "../../components/Header";
// import ApiClient from "../api/getCourseData";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import Course, { getServerSideProps } from "../../pages/course";
// import { getCourseDataMock } from "../api/getCourseDataMock";
// import "@testing-library/jest-dom";
// import { PropsDataCourse, CourseDataProps } from "../../helpers/types";
// import {
//   handleLockedVideo,
//   handleUnlockedVideo,
// } from "../../helpers/videoUtils";
// import LessonCard from "../../components/LessonCard";
// import { fetchDataMock } from "../api/fetchDataMock";
// import {
//   GetServerSidePropsContext,
//   NextApiRequest,
//   NextApiResponse,
// } from "next";

// const mockApiResponse = getCourseDataMock("1");
// const host = "http://api.wisey.app";
// const version: string = "api/v1";
// const id = "1";
// const server = setupServer(
//   rest.get(`${host}/${version}/core/preview-courses/${id}`, (req, res, ctx) => {
//     return res(ctx.json(mockApiResponse));
//   })
// );
// const fetchMock = jest.fn();
// global.fetch = fetchMock;
// describe("Course component", () => {
//   beforeAll(() => server.listen());
//   afterEach(() => server.resetHandlers());
//   afterAll(() => server.close());
//   test("renders course title and description", async () => {
//     render(
//       <Course data={(await getCourseDataMock("1")).data as CourseDataProps} />
//     );
//     expect(
//       screen.getByText("Lack of Motivation & How to Overcome It")
//     ).toBeInTheDocument();
//     expect(
//       screen.getByText(
//         "Reignite your inner drive by managing factors that dampen your motivation."
//       )
//     ).toBeInTheDocument();
//   });
//   test("renders course data from API", async () => {
//     const context: GetServerSidePropsContext = {
//       req: {} as NextApiRequest,
//       res: {} as NextApiResponse,
//       resolvedUrl: "",
//       query: { id: "123" },
//     };
//     const { props } = await getServerSideProps(context);
//     expect(props.data).toEqual(mockApiResponse);
//   });

//   test("calls onClick function when LessonCard is clicked", async () => {
//     const onClick = jest.fn();
//     const lesson = (await getCourseDataMock("1")).data.lessons[0];
//     const { getByText } = render(<LessonCard {...lesson} />);
//     waitFor(() => {
//       fireEvent.click(getByText(`${lesson.order}. ${lesson.title}`));
//       expect(onClick).toHaveBeenCalledTimes(1);
//     });
//   });
// });
import React, { useState } from "react";
import InfoCard from "../../components/InfoCard";
import Header from "../../components/Header";
import ApiClient from "../api/getCourseData";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Course, { getServerSideProps } from "../../pages/course";
import { getCourseDataMock } from "../api/getCourseDataMock";
import "@testing-library/jest-dom";
import { PropsDataCourse, CourseDataProps } from "../../helpers/types";
import {
  handleLockedVideo,
  handleUnlockedVideo,
} from "../../helpers/videoUtils";
import LessonCard from "../../components/LessonCard";
import { fetchDataMock } from "../api/fetchDataMock";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import fetchMock from "jest-fetch-mock";

const mockApiResponse = getCourseDataMock(
  "352be3c6-848b-4c19-9e7d-54fe68fef183"
);
const host = "http://api.wisey.app";
const version: string = "api/v1";
const id = "352be3c6-848b-4c19-9e7d-54fe68fef183";
const server = setupServer(
  rest.get(`${host}/${version}/core/preview-courses/${id}`, (req, res, ctx) => {
    return res(ctx.json(mockApiResponse));
  })
);
import fetchAccessToken from "../api/accessToken";

describe("Course component", () => {
  jest.mock("../api/accessToken", () => ({
    __esModule: true,
    default: jest.fn(),
  }));
  beforeAll(() => {
    server.listen();
    fetchMock.enableMocks();
  });
  afterEach(() => {
    server.resetHandlers();
    fetchMock.resetMocks();
  });
  afterAll(() => {
    server.close();
    fetchMock.disableMocks();
  });
  test("renders course title and description", async () => {
    render(
      <Course
        data={
          (await getCourseDataMock("352be3c6-848b-4c19-9e7d-54fe68fef183"))
            .data as CourseDataProps
        }
      />
    );
    expect(
      screen.getByText("Lack of Motivation & How to Overcome It")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Reignite your inner drive by managing factors that dampen your motivation."
      )
    ).toBeInTheDocument();
  });
  //   test("renders course data from API", async () => {
  //     (fetchAccessToken as jest.Mock).mockResolvedValue(
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZTAwZjZiZi1jOGFiLTQ1ZWYtOTA4OS1iN2E1NzhmYmMxYzgiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2ODM0OTE3NzIsImV4cCI6MTY4MzQ5MjY3Mn0.ynhUzPOlufrFHRKkpNPbKVes2f2xsCemz7_IhLPLH18"
  //     );
  //     const context: GetServerSidePropsContext = {
  //       req: {} as NextApiRequest,
  //       res: {} as NextApiResponse,
  //       resolvedUrl: "",
  //       query: { id: '"352be3c6-848b-4c19-9e7d-54fe68fef183"' },
  //     };
  //     const { props } = await getServerSideProps(context);
  //     expect(props.data).toEqual(mockApiResponse);
  //   });
});
