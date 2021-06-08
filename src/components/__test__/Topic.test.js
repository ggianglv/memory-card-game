import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { AppContext } from "../../context";
import { initialState } from "../../reducers";
import Topic from "../Topic";
import renderer from "react-test-renderer";

test("Topic render correctly", () => {
  const { getByTestId } = render(
    <AppContext.Provider value={{ state: initialState, dispatch: () => {} }}>
      <Topic />
    </AppContext.Provider>
  );
  const topic = initialState.topic;

  expect(getByTestId(topic).classList.contains("active")).toBe(true);
});

test("Topic to match snapshot", () => {
  const tree = renderer
    .create(
      <AppContext.Provider value={{ state: initialState, dispatch: () => {} }}>
        <Topic />
      </AppContext.Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
