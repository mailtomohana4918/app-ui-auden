import { render } from "@testing-library/react";
import Header from "./Header";
import React from 'react'
describe("Header", () => {
  it("render component as expected", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
