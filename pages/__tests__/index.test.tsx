import { render, screen } from "@testing-library/react";
import Home from "..";
import "@testing-library/jest-dom";

describe("Index page", () => {
  it("renders the 'Go to Courses' button", () => {
    render(<Home />);
    const buttonElement = screen.getByText("Go To Courses");
    expect(buttonElement).toBeInTheDocument();
  });

  // add more tests as needed
});
