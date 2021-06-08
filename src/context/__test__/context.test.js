import React, { useContext } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AppContext } from "../../context";

test("Render context correctly", () => {
  const contextValue = {
    testText: "this is random text",
  };

  const TestComponent = () => {
    const data = useContext(AppContext);

    return <div data-testid="topic">{data.testText}</div>;
  };

  const { getByTestId } = render(
    <AppContext.Provider value={contextValue}>
      <TestComponent />
    </AppContext.Provider>
  );

  expect(getByTestId("topic")).toHaveTextContent(contextValue.testText);
});
