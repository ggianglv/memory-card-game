import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Title from "../Title";
import renderer from "react-test-renderer";

test("Title to match snapshot", () => {
  const tree = renderer.create(<Title />).toJSON();

  expect(tree).toMatchSnapshot();
});
