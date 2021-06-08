import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AppContext } from "../../context";
import { initialState } from "../../reducers";
import History from "../History";
import renderer from "react-test-renderer";

test("render History without crash", () => {
  render(
    <AppContext.Provider value={{ state: initialState, dispatch: () => {} }}>
      <History />
    </AppContext.Provider>
  );
});

test("History to match snapshot", () => {
  const tree = renderer
    .create(
      <AppContext.Provider value={{ state: initialState, dispatch: () => {} }}>
        <History />
      </AppContext.Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
