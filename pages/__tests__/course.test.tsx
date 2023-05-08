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
  it("displays the unlocked course content when lockedContent is false", async () => {
    render(
      <Course
        data={
          (await getCourseDataMock("352be3c6-848b-4c19-9e7d-54fe68fef183"))
            .data as CourseDataProps
        }
      />
    );
    const unlockedContent = screen.queryByText("This content is locked");
    expect(unlockedContent).not.toBeInTheDocument();
  });
});
