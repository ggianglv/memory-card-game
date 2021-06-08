import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewGame from "../NewGame";
import renderer from "react-test-renderer";

test("render NewGame without crash", () => {
  render(<NewGame />);
});

test("render correct NewGame", () => {
  const { getByTestId } = render(<NewGame />);

  expect(getByTestId("easy")).toHaveTextContent("Easy (4x4)");
  expect(getByTestId("medium")).toHaveTextContent("Medium (4x5)");
  expect(getByTestId("hard")).toHaveTextContent("Hard (4x6)");
});

test("NewGame to match snapshot", () => {
  const tree = renderer.create(<NewGame />).toJSON();

  expect(tree).toMatchSnapshot();
});
