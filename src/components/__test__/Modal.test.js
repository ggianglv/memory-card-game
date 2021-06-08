import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Modal from "../Modal";
import renderer from "react-test-renderer";

test("render Modal without crash", () => {
  render(<Modal />);
});

test("render correct Modal", () => {
  const { getByTestId } = render(
    <Modal title="this is title">this is children</Modal>
  );

  expect(getByTestId("title")).toHaveTextContent("this is title");
  expect(getByTestId("children")).toHaveTextContent("this is children");
});

test("Modal to match snapshot", () => {
  const tree = renderer.create(<Modal />).toJSON();

  expect(tree).toMatchSnapshot();
});
