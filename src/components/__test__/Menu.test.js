import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AppContext } from "../../context";
import { initialState } from "../../reducers";
import Menu from "../Menu";
import renderer from "react-test-renderer";

test("render Menu without crash", () => {
  render(
    <AppContext.Provider value={{ state: initialState, dispatch: () => {} }}>
      <Menu />
    </AppContext.Provider>
  );
});


test("Menu to match snapshot", () => {
  const tree = renderer
    .create(
      <AppContext.Provider value={{ state: initialState, dispatch: () => {} }}>
        <Menu />
      </AppContext.Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
