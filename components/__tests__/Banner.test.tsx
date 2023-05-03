import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Banner from "../Banner";
describe("Banner", () => {
  test("renders an image with the specified src and alt text", () => {
    const { getByAltText } = render(<Banner />);
    const image = getByAltText(
      "Image of student listening to an online course"
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "student-cr.jpg");
  });
  test("applies the correct CSS classes", () => {
    render(<Banner />);
    const card = screen.getByRole("img");
    expect(card).toHaveClass("rounded-3xl");
    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass("bg-gray-100");
    expect(container).toHaveClass("p-6");
    expect(container).toHaveClass("md:p-10");
    expect(container).toHaveClass("lg:p-16");
    expect(container).toHaveClass("rounded-3xl");
    expect(container).toHaveClass("flex");
    expect(container).toHaveClass("flex-col");
    expect(container).toHaveClass("align-center");
  });
});
