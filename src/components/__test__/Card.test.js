import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "../Card";

test("render Card without crash", () => {
  render(<Card />);
});

test("render correct card", () => {
  const image = 'https://sample.com/img.png'
  const { getByTestId } = render(<Card image={image} />);
  const bgImage = getByTestId("image").style.backgroundImage
  expect(bgImage).toEqual(`url(${image})`);
});


