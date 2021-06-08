import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AppContext } from "../../context";
import { initialState } from "../../reducers";
import Board from "../Board";

test("render without crash", () => {
  render(
    <AppContext.Provider value={{ state: initialState, dispatch: () => {} }}>
      <Board />
    </AppContext.Provider>
  );
});


