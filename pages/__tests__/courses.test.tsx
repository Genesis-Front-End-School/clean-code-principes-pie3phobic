import React, { useState } from "react";
import InfoCard from "../../components/InfoCard";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { paginate } from "../../helpers/paginate";
import ApiClient from "../api/getCourseData";
import { CourseProps } from "../../helpers/types";
import { PaginationProps, DataProps } from "../../helpers/types";
import { render, screen, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fetchDataMock } from "../api/fetchDataMock";
import Courses from "../../pages/courses";
import "@testing-library/jest-dom";

// const server = setupServer(
//   rest.get(
//     "http://api.wisey.app/api/v1/core/preview-courses",
//     (req, res, ctx) => {
//       return res(ctx.json(fetchDataMock()));
//     }
//   )
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: jest.fn(),
// }));

// const onPageChangeMock = jest.fn();
// const props = {
//   items: 20,
//   currentPage: 1,
//   pageSize: 10,
//   onPageChange: onPageChangeMock,
// };

describe("Courses page", () => {
  test("should render data correctly", async () => {
    render(
      <Courses data={(await fetchDataMock()).data as DataProps["data"]} />
    );

    const courseTitle = await screen.findByText(
      "Lack of Motivation & How to Overcome It"
    );
    const courseDescription = await screen.findByText(
      "Reignite your inner drive by managing factors that dampen your motivation."
    );
    const numberOfLessons = await screen.findByText("Number of lessons: 5");
    const rating = await screen.findByText("3.5");
    expect(courseTitle).toBeInTheDocument();
    expect(courseDescription).toBeInTheDocument();
    expect(numberOfLessons).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(Number(rating.textContent)).toEqual(
      (await fetchDataMock()).data.courses[0].rating
    );
  });
  //   test("check if the correct number of infocards is rendered", async () => {
  //     const { data } = await fetchDataMock();
  //     render(<Courses data={data} />);
  //     const infoCards = screen.getByTestId("info-card");
  //     console.log(infoCards);
  //     expect(infoCards).toHaveLength(data.courses.length);
  //   });
});
