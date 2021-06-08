import { LEVEL, TOPICS } from "../../constants";
import { generateGameData, uuidv4, usePrevious } from "../data";
import { renderHook } from "@testing-library/react-hooks";

const randomCall = (fn) => {
  return fn(uuidv4());
};

test("uuidv4 return random value", () => {
  const mock = jest.fn();
  randomCall(mock);
  expect(mock).toBeCalledWith(expect.any(String));
});

test("generateGameData return correctly", () => {
  const mode = LEVEL.EASY;
  const topic = TOPICS.PEPE;
  const gameData = generateGameData({ mode, topic });
  expect(gameData).toHaveProperty("cards");
  expect(gameData).toHaveProperty("cardData");
  expect(gameData).toHaveProperty("start");
  expect(gameData).toHaveProperty("removed");
  expect(gameData).toHaveProperty("move");
  expect(gameData).toHaveProperty("time");
});

const setUp = () =>
  renderHook(({ state }) => usePrevious(state), { initialProps: { state: 0 } });
it("usePrevious should return undefined on initial render", () => {
  const { result } = setUp();
  expect(result.current).toBe(0);
});

it("usePrevious should always return previous state after each update", () => {
  const { result, rerender } = setUp();
  rerender({ state: 2 });
  expect(result.current).toBe(0);
  rerender({ state: 4 });
  expect(result.current).toBe(2);
  rerender({ state: 6 });
  expect(result.current).toBe(4);
});
