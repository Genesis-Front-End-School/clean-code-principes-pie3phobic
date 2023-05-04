import React from "react";
import Pagination from "../Pagination";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import styles from "../styles/Home.module.css";
import "@testing-library/jest-dom";

const props = {
  items: 25,
  pageSize: 10,
  currentPage: 1,
  onPageChange: jest.fn(),
};
const pagesCount = Math.ceil(props.items / props.pageSize);
//if (pagesCount === 1) return null;
const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

describe("Pagination component", () => {
  test("renders correctly", () => {
    render(<Pagination {...props} />);
    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });
  //   test("renders correct number of pages", () => {
  //     const { getAllByRole } = render(<Pagination {...props} />);
  //     const pages = getAllByRole("link");
  //     expect(pages.length).toBe(3); // 3 pages (1, 2, 3) for 25 items with a page size of 10
  //   });

  test("renders active page correctly", () => {
    render(<Pagination {...props} />);
    const activePage = screen.getByText("1");
    expect(activePage).toHaveClass("pageItemActive");
  });

  test("calls onPageChange when page is clicked", () => {
    const { getByText } = render(<Pagination {...props} />);
    const pageTwo = getByText("2");
    fireEvent.click(pageTwo);
    expect(props.onPageChange).toHaveBeenCalledWith(2);
  });
});
