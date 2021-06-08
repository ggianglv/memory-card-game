import React from 'react'
import ShallowRenderer from "react-test-renderer/shallow";
import Board from "./components/Board";

let realUseContext;
let useContextMock;
// Setup mock
beforeEach(() => {
  realUseContext = React.useContext;
  useContextMock = React.useContext = jest.fn();
});
// Cleanup mock
afterEach(() => {
  React.useContext = realUseContext;
});

test("mock hook", () => {
  useContextMock.mockReturnValue("Test Value");
  const element = new ShallowRenderer().render(<Board />);
  expect(element.props.children).toBe("Test Value");
});
